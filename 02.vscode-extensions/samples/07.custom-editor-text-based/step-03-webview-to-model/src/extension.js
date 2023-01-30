const vscode = require('vscode');
const MyTextEditorProvider = require('./MyTextEditorProvider');

function activate(context) {

    console.log('Congratulations, your extension "07.custom-editor-text-based" is now active!');
    const provider = new MyTextEditorProvider();

    context.subscriptions.push(
        vscode.window.registerCustomEditorProvider('my-text-editor', provider)
    );
}

function deactivate() { }

module.exports = {
    activate,
    deactivate
}