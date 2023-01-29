const vscode = require('vscode');

function activate(context) {

    console.log('Congratulations, your extension "command-execute-without-arg" is now active!');

    let disposable = vscode.commands.registerCommand('command-execute-without-arg.exec-no-arg', function () {
        console.log('command command-execute-without-arg.exec-no-arg is executed!!');
        vscode.commands.executeCommand('editor.action.addCommentLine');
    });

    context.subscriptions.push(disposable);
}

function deactivate() { }

module.exports = {
    activate,
    deactivate
}