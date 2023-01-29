const vscode = require('vscode');
const MyViewProvider = require('./TreeDataProvider');


function activate(context) {

    console.log('Congratulations, your extension "my-tree-view" is now active!');

    // let disposable = vscode.commands.registerCommand('my-tree-view.~command-name~', function () {
    //     console.log('command my-tree-view.~command-name~ is executed!!');
    // });

    // context.subscriptions.push(disposable);


    // Samples of `window.registerTreeDataProvider`
    const myViewProvider = new MyViewProvider();
    vscode.window.registerTreeDataProvider('myTreeView', myViewProvider);
    vscode.commands.registerCommand('myTreeView.refresh', () => myViewProvider.refresh())

    // 暂时button的位置，action没有实际功能
    vscode.commands.registerCommand('myTreeView.titleInline', () => vscode.window.showInformationMessage('titleInline按钮被点击了'));
    vscode.commands.registerCommand('myTreeView.item', () => vscode.window.showInformationMessage('item按钮被点击了'));
    vscode.commands.registerCommand('myTreeView.itemInline', () => vscode.window.showInformationMessage('itemInline按钮被点击了'));
    //myTreeView.itemSelected
    vscode.commands.registerCommand('myTreeView.itemSelected', (item) => vscode.window.showInformationMessage(`${item.label} 被选中了`));
}

function deactivate() { }

module.exports = {
    activate,
    deactivate
}