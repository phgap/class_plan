const vscode = require('vscode');

function activate(context) {

    console.log('Congratulations, your extension "my-binary-editor" is now active!');

}

function deactivate() { }

module.exports = {
    activate,
    deactivate
}