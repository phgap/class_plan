const vscode = require('vscode');
const PictureEditorProvider = require('./PictureEditorProvider');

function activate(context) {
    console.log('Congratulations, your extension "picture-editor" is now active!');

    context.subscriptions.push(
        vscode.window.registerCustomEditorProvider(
            'picture-editor',
            new PictureEditorProvider(context),
            {
                // For this demo extension, we enable `retainContextWhenHidden` which keeps the
                // webview alive even when it is not visible. You should avoid using this setting
                // unless is absolutely required as it does have memory overhead.
                webviewOptions: {
                    retainContextWhenHidden: true,
                },
                supportsMultipleEditorsPerDocument: false,
            }
        )
    )


}

function deactivate() { }

module.exports = {
    activate,
    deactivate
}