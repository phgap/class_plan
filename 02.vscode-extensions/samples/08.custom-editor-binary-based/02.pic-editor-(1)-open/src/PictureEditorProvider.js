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
        // ①
        // 有备份的文档，从备份中读取，否则从vscode工作区中读取
        let documentUri = openContext.backupId || uri;

        const data = await PictureEditorDocument.readFile(documentUri);

        // ②
        // document内部需要维护文本本来的路径。
        const document = new PictureEditorDocument(uri, data);
        return document;
    }

    // 没打开一个该文档的编辑器，都会调用该函数
    async resolveCustomEditor(document, webviewPanel, token) {
        console.log('=====[PictureEditorProvider::resolveCustomEditor]=====document', document);
        // ③
        const { webview } = webviewPanel;
        webview.options = {
            enableScripts: true
        }

        webview.html = this.getHtml(webview);

        // ⑤
        webview.onDidReceiveMessage(msg => {
            if (msg.type === 'ready') {
                webview.postMessage({
                    type: 'init',
                    body: { data: document._data }
                })
            }
        })
    }

    // 保存文档的时候调用
    async saveCustomDocument(document, token) {
        console.log('=====[PictureEditorProvider::saveCustomDocument]=====');
    }

    // 另存为文档时调用
    async saveCustomDocumentAs(document, destination, token) {
        console.log('=====[PictureEditorProvider::saveCustomDocumentAs]=====');
    }

    // vscode热退出时调用
    async backupCustomDocument(document, context, token) {
        console.log('=====[PictureEditorProvider::backupCustomDocument]=====');
    }

    // 执行命令【File: Revert File】时调用
    async revertCustomDocument(document, token) {
        console.log('=====[PictureEditorProvider::revertCustomDocument]=====');
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
                <div class="drawing-canvas"></div>
                <script nonce="${nonce}" src="${scriptUri}"></script>
            </body>
            </html>
        `;
    }
}

module.exports = PictureEditorProvider;