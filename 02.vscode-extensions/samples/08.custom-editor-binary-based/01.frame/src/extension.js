const vscode = require('vscode');
const MyBinaryEditorProvider = require('./MyBinaryEditorProvider');

function activate(context) {
    console.log('Congratulations, your extension "my-binary-editor" is now active!');

    context.subscriptions.push(
        vscode.window.registerCustomEditorProvider(
            'my-binary-editor',
            new MyBinaryEditorProvider()
        )
    )


}

function deactivate() { }

module.exports = {
    activate,
    deactivate
}