const vscode = require('vscode');

class NodeDependencyItem extends vscode.TreeItem {
    constructor(label, version) {
        super(label, vscode.TreeItemCollapsibleState.Collapsed);
        this.tooltip = `${label}-${version}`;
    }
}

module.exports = NodeDependencyItem;