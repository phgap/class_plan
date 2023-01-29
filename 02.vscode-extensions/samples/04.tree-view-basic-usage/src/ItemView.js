const vscode = require('vscode');

class ItemView extends vscode.TreeItem {
    constructor(label, collapsibleState = vscode.TreeItemCollapsibleState.None) {
        super(label, collapsibleState);
        // this.command.tooltip = label;
        this.command = {
            tooltip: label,
            command: 'myTreeView.itemSelected',
            title: 'item selected',
            arguments: [this]
        }
    }
}

module.exports = ItemView;