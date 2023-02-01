const path = require('path');
const vscode = require('vscode');
const PictureEditorDocument = require('./PictureEditorDocument');

class PictureEditorProvider {
    eventEmitter = new vscode.EventEmitter();
    onDidChangeCustomDocument = this.eventEmitter.event;

    constructor(context) {
        this.context = context;
    }

    async openCustomDocument(uri, openContext, token) {
        console.log('=====[PictureEditorProvider::openCustomDocument]=====');
        // 有备份的文档，从备份中读取，否则从vscode工作区中读取
        // openContext.backupId为字符串，vscode.Uri.parse将其转换为uri对象
        let documentUri = openContext.backupId ? vscode.Uri.parse(openContext.backupId) : uri;

        const data = await PictureEditorDocument.readFile(documentUri);

        // document内部需要维护文本本来的路径。
        const document = new PictureEditorDocument(uri, data);
        return document;
    }

    // 没打开一个该文档的编辑器，都会调用该函数
    async resolveCustomEditor(document, webviewPanel, token) {
        console.log('=====[PictureEditorProvider::resolveCustomEditor]=====document', document);

        this.webviewPanel = webviewPanel;

        const { webview } = webviewPanel;
        webview.options = {
            enableScripts: true
        }

        webview.html = this.getHtml(webview);

        webview.onDidReceiveMessage(msg => {
            if (msg.type === 'ready') {
                webview.postMessage({
                    type: 'init',
                    body: { data: document._data }
                })
            }

            if (msg.type === 'rotate') {
                document.makeEdit(msg, this);
            }

            if (msg.type === 'file-data') {
                const { data, destination } = msg.body;
                document.saveFile(destination, data);
            }
        })
    }

    // 保存文档的时候调用
    async saveCustomDocument(document, token) {
        console.log('=====[PictureEditorProvider::saveCustomDocument]=====');
        // ②
        this.webviewPanel.webview.postMessage({
            type: 'file-data',
            body: {
                destination: document.uri
            }
        })

        document._savedEdits = Array.from(document._edits);
    }

    // 另存为文档时调用
    async saveCustomDocumentAs(document, destination, token) {
        console.log('=====[PictureEditorProvider::saveCustomDocumentAs]=====');
        // ②
        this.webviewPanel.webview.postMessage({
            type: 'file-data',
            body: {
                destination
            }
        })

        document._savedEdits = Array.from(document._edits);
    }

    // vscode热退出时调用
    async backupCustomDocument(document, context, token) {
        console.log('=====[PictureEditorProvider::backupCustomDocument]=====');
        // ②
        const destination = context.destination;
        this.webviewPanel.webview.postMessage({
            type: 'file-data',
            body: {
                destination
            }
        })

        return {
            id: destination.toString(),
            delete: async () => {
                await vscode.workspace.fs.delete(destination)
            }
        }
    }

    // 执行命令【File: Revert File】时调用
    async revertCustomDocument(document, token) {
        console.log('=====[PictureEditorProvider::revertCustomDocument]=====');

        const data = await PictureEditorDocument.readFile(document.uri);

        document._data = data;
        document._edits = document._savedEdits;

        this.webviewPanel.webview.postMessage({
            type: 'update',
            body: document._edits.slice(-1)[0] || { type: 'rotate', degrees: 0 }
        })
    }

    // 工具函数，不是Provider必须的
    getHtml(webview) {
        let styleUri = path.join(this.context.extensionPath, 'editor', 'editor.css');
        styleUri = vscode.Uri.file(styleUri);
        styleUri = webview.asWebviewUri(styleUri);
        let scriptUri = path.join(this.context.extensionPath, 'editor', 'editor.js');
        scriptUri = vscode.Uri.file(scriptUri);
        scriptUri = webview.asWebviewUri(scriptUri);
        const getNonce = () => {
            let text = '';
            const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            for (let i = 0; i < 32; i++) {
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            }
            return text;
        }

        const nonce = getNonce();
        return `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src ${webview.cspSource} blob:; style-src ${webview.cspSource}; script-src 'nonce-${nonce}';">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                
                <title>Document</title>
                <link href="${styleUri}" rel="stylesheet" />
            </head>
            <body>
                <h1>VS Code 图像编辑器</h1>
                <div class="button-group">
                    <button class="clockwise">顺时针旋转90°</button>
                    <button class="anticlockwise">逆时针旋转90°</button>
                </div>
                <div class="drawing-canvas"></div>
                <script nonce="${nonce}" src="${scriptUri}"></script>
            </body>
            </html>
        `;
    }
}

module.exports = PictureEditorProvider;