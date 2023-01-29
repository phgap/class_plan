const vscode = require('vscode');

function activate(context) {

    console.log('Congratulations, your extension "command-execute-with-arg" is now active!');

    let disposable = vscode.commands.registerCommand('command-execute-with-arg.exec-with-arg', async function () {
        console.log('command command-execute-with-arg.exec-with-arg is executed!!');
        const activeEditor = vscode.window.activeTextEditor;
        if (!activeEditor) {
            return;
        }

        const definitions = await vscode.commands.executeCommand(
            'vscode.executeDefinitionProvider',
            activeEditor.document.uri,
            activeEditor.selection.active
        );

        for (const definition of definitions) {
            console.log(definition);
            // 找到定义的位置：行（definition.targetRange.start.line）
            // 找到定义的位置：列（definition.targetRange.start.character）
        }

    });

    context.subscriptions.push(disposable);
}

function deactivate() { }

module.exports = {
    activate,
    deactivate
}