const vscode = require('vscode');

function activate(context) {

    console.log('Congratulations, your extension "~extension-name~" is now active!');

    let disposable = vscode.commands.registerCommand('~extension-name~.~command-name~', function () {
        console.log('command ~extension-name~.~command-name~ is executed!!');
    });

    context.subscriptions.push(disposable);
}

function deactivate() { }

module.exports = {
    activate,
    deactivate
}