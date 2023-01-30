const vscode = require('vscode');

class MyTextEditorProvider {
    resolveCustomTextEditor(document, webviewPanel, token) {
        console.log('=====[MyTextEditorProvider::resolveCustomTextEditor]=====text', document.fileName);
        webviewPanel.webview.html = `
            <style>
                h1 {
                    cursor: pointer;
                }
            </style>
            <h1 contenteditable="true">${document.getText()}</h1>
            <script>
                const vscode = acquireVsCodeApi();

                window.addEventListener('message', (e) => {
                    document.querySelector('h1').innerText = e.data.text;
                })

                document.querySelector('h1').addEventListener('input', (e)=> {
                    console.log('=====[页面内容发送变化]=====', e.target.textContent);
                    const txt = e.target.textContent;
                    vscode.postMessage({
                        type: 'text-update',
                        text: txt
                    });
                })

                
            </script>
        `;

        // webview为了能够接受extension的消息，需要开启script选项
        webviewPanel.webview.options = {
            enableScripts: true
        }

        vscode.workspace.onDidChangeTextDocument(e => {
            // vscode内所有文档的编辑，都会触发该事件，所以要确认被修改文档是否为当前文档
            if (document.uri.toString() === e.document.uri.toString()) {
                console.log('=====[vscode.workspace.onDidChangeTextDocument]=====e', e)
                // 发现文档有更新，向webview发送消息
                webviewPanel.webview.postMessage({
                    type: 'text-update',
                    text: document.getText()
                })
            }
        })

        // 来自webview的更新信息
        webviewPanel.webview.onDidReceiveMessage(e => {
            console.log('=====[webviewPanel.webview.onDidReceiveMessage]=====txt', e.text);
            const edit = new vscode.WorkspaceEdit();

            edit.replace(
                document.uri,
                new vscode.Range(0, 0, document.lineCount, 0),
                e.text
            )

            vscode.workspace.applyEdit(edit);
        })
    }
}

module.exports = MyTextEditorProvider;