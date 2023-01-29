const vscode = require('vscode');
const NodeDependencyProvider = require('./NodeDependencyProvider');

function activate(context) {
    console.log('Congratulations, your extension "node-dependencies" is now active!');
    const rootPath = vscode.workspace.workspaceFolders[0].uri.fsPath;
    const nodeDepProvider = new NodeDependencyProvider(rootPath);
    vscode.window.registerTreeDataProvider('node-dependencies-view', nodeDepProvider);

    vscode.commands.registerCommand('node-dependencies-view.openNpm', (item) => {
        console.log('==========[node-dependencies-view.openNpm]==========item', item);
        vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(`https://www.npmjs.com/package/${item.label}`));
    })
}

function deactivate() { }

module.exports = {
    activate,
    deactivate
}