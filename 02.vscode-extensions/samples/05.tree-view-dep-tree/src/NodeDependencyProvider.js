const vscode = require('vscode');
const path = require('path');
const fs = require('fs');
const DependencyItem = require('./NodeDependencyItem');
const { version } = require('os');

class NodeDependencyProvider {
    constructor(workSpaceRoot) {
        this.workSpaceRoot = workSpaceRoot;
    }

    getTreeItem(item) {
        let packageJsonPath = path.join(this.workSpaceRoot, 'node_modules', item.label, 'package.json');
        if (this.getChildrenFromDeps(packageJsonPath).length === 0) {
            item.collapsibleState = vscode.TreeItemCollapsibleState.None
        }
        return item;
    }

    getChildren(item) {
        // return Promise.resolve([]);
        let packageJsonPath = '';
        if (!item) {
            // 根路径依赖
            packageJsonPath = path.join(this.workSpaceRoot, 'package.json');
        } else {
            const moduleName = item.label;
            packageJsonPath = path.join(this.workSpaceRoot, 'node_modules', moduleName, 'package.json');
        }
        return Promise.resolve(
            this.getChildrenFromDeps(packageJsonPath)
        );
    }

    getChildrenFromDeps(path) {
        console.log('=====[NodeDependencyProvider::getChildrenFromDeps]=====path', path);
        // 最后再check文件是否存在
        if (!this.checkFileExist(path)) {
            return []
        }

        const packageJson = JSON.parse(fs.readFileSync(path, 'utf-8'));
        console.log('=====[NodeDependencyProvider::getChildrenFromDeps]=====package name', packageJson.name);
        const toItems = deps => Object.keys(deps).map((moduleName) => {
            const version = deps[moduleName];
            return new DependencyItem(moduleName, version)
        });

        const deps = packageJson.dependencies ? toItems(packageJson.dependencies) : [];
        const devDeps = packageJson.devDependencies ? toItems(packageJson.devDependencies) : [];
        return [].concat(deps, devDeps);
    }

    checkFileExist(path) {
        try {
            const stat = fs.statSync(path);
            return true;
        } catch (e) {
            console.log(e);
            return false;
        }
    }
}

module.exports = NodeDependencyProvider;