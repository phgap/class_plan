# 思路
1. 配置view container
2. 配置tree view
3. NodeDependencyProvider
   1. getTreeItem
      `return item`
   2. getChildren
      `return []`
4. 注册Provider
5. viewWelcome
6. NodeDependencyItem
7. 实现getChildren细节
   1. 根节点：读取根路径下的package.json,并列出dependencies
   2. 子节点：
        找到node_modules下的module_name对应的文件夹，读取package.json
        有dependencies/devDependencies: 
            读取，返回NodeDependencyItem数组
        没有
            返回[]
8. 实现getTreeItem
   读取Item在node_module下的package.json，如果
    有dependencies：collapsibleState设置为【vscode.TreeItemCollapsibleState.Collapse】
    没有：设置为【vscode.TreeItemCollapsibleState.None】
9. 追加inline item button
   1.  package.json
   2.  定义command
   3.  绑定command回调