const vscode = require('vscode');

class MyTextEditorProvider {
    resolveCustomTextEditor(document, webviewPanel, token) {
        console.log('=====[MyTextEditorProvider::resolveCustomTextEditor]=====text', document.fileName);
        webviewPanel.webview.html = `
            <h1>${document.getText()}</h1>
        `;
    }
}

module.exports = MyTextEditorProvider;