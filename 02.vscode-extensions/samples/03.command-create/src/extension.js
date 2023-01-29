const vscode = require('vscode');

function activate(context) {

    console.log('Congratulations, your extension "command-create" is now active!');

    let disposable = vscode.commands.registerCommand('command-create.new-command-name', async function () {
        console.log('command command-create.new-command-name is executed!!');
    });

    context.subscriptions.push(disposable);
}

function deactivate() { }

module.exports = {
    activate,
    deactivate
}