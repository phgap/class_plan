const vscode = require('vscode');
const ItemView = require('./ItemView');

class MyViewProvider {
    onDidChangeEmitter = new vscode.EventEmitter();
    // 一个事件。通知Tree View更新。
    onDidChangeTreeData = this.onDidChangeEmitter.event;

    constructor(workspaceRoot) {
        this.workspaceRoot = workspaceRoot;
    }

    getTreeItem(item) {
        console.log('=====[MyViewProvider::getTreeItem]=====item', item);
        return item;
    }

    getChildren(item) {
        console.log('=====[MyViewProvider::getChildren]=====item', item);
        // view中没有数据时，返回空数组，此时会显示【viewsWelcome】中配置的信息。
        // return Promise.resolve([]);
        if (item) {
            switch (item.label) {
                case 'item-1':
                    return Promise.resolve([
                        new ItemView('item-1-1'),
                        new ItemView('item-1-2')
                    ]);
                case 'item-2':
                    return Promise.resolve([
                        new ItemView('item-2-1'),
                        new ItemView('item-2-2')
                    ]);
                default:
                    return Promise.resolve([]);
            }

        } else {
            // 根节点
            return Promise.resolve([
                new ItemView('item-1', vscode.TreeItemCollapsibleState.Collapsed),
                new ItemView('item-2', vscode.TreeItemCollapsibleState.Collapsed),
                new ItemView('item-3')
            ])
        }
    }

    refresh() {
        // fire方法可以通知VS Code，view中有变化
        this.onDidChangeEmitter.fire();
    }
}

module.exports = MyViewProvider;