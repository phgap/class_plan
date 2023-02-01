const vscode = require('vscode');
const MyCustomDocument = require('./MyCustomDocument');


// MyBinaryEditorProvider必须实现下面六个方法：
// openCustomDocument:      为指定文件创建一个document。该函数在文件第一次被打开时调用。
//                          随后document会被传递给resolveCustomEditor,用于在视图中展示内容
// resolveCustomEditor:     每次为一个文件打开一个编辑器，都会调用该函数
// revertCustomDocument:    将文档内容回退到最后一次保存的状态（当用户使用命令【File: Revert File】时触发）
// saveCustomDocument:      保存文档
// saveCustomDocumentAs:    文档另存为
// backupCustomDocument:    备份文档，以避免突然退出导致内容丢失
// 另外，如果注册的是只读编辑器，则只需实现openCustomDocument和resolveCustomEditor两个方法即可。

class MyBinaryEditorProvider {
    eventEmitter = new vscode.EventEmitter();
    onDidChangeCustomDocument = this.eventEmitter.event;
    // vscode中首次访问文件时，会调用该函数，用来创建CustomDocument实例。
    // 后续在编辑器中打开文件，并不会创建该文档。除非所有打开该文档的编辑器都全部被关闭后，
    // 再重新打开文档时，才会调用此方法
    async openCustomDocument(uri, openContext, token) {
        console.log('=====[MyBinaryEditorProvider::openCustomDocument]=====');
        console.log('=====[MyBinaryEditorProvider::openCustomDocument]=====uri', uri);
        console.log('=====[MyBinaryEditorProvider::openCustomDocument]=====openContext', openContext);
        console.log('=====[MyBinaryEditorProvider::openCustomDocument]=====token', token);
        // uri: 被打开文档的路径
        // openContext.backupId: 热退出时，备份文档的标识符，如果该属性有值，我们应该从该属性读取文档，否则，从工作区中读取文档
        // openContext.untitledDocumentData: 如果文档的uri是一个未命名文件,则该属性会存放该文档的数据
        // token.isCancellationRequested: 是否取消操作
        // token.onCancellationRequested: 取消操作触发的事件
        // 返回值: Promise 对象。 resolve一个自定义文档或者其子类(CustomDocument)
        const document = new MyCustomDocument(uri);
        return document;
    }

    // 没打开一个该文档的编辑器，都会调用该函数
    async resolveCustomEditor(document, webviewPanel, token) {
        console.log('=====[MyBinaryEditorProvider::resolveCustomEditor]=====');
        // document: openCustomDocument返回的CustomDocument实例
        // webviewPanel: 被打开的编辑器对应的视图
        // token.isCancellationRequested: 是否取消操作
        // token.onCancellationRequested: 取消操作触发的事件

        // 通知文档改变，可以fire两种事件类型:
        // 1. 不支持undo redo
        // {
        //     document
        // }
        // 2. 支持undo redo
        // {
        //     label: string
        //     document
        //     undo: function
        //     redo: function
        // }
        this.eventEmitter.fire({
            document,
            label: 'init',
            undo: () => {
                console.log('=====[undo]=====')
            },
            redo: () => {
                console.log('=====[redo]=====')
            }
        });
    }

    // 保存文档的时候调用
    async saveCustomDocument(document, token) {
        console.log('=====[MyBinaryEditorProvider::saveCustomDocument]=====');
        // document: openCustomDocument返回的CustomDocument实例
        // token.isCancellationRequested: 是否取消操作
        // token.onCancellationRequested: 取消操作触发的事件
        // 返回值: Promise 对象。
        return Promise.resolve();
    }

    // 另存为文档时调用
    async saveCustomDocumentAs(document, destination, token) {
        console.log('=====[MyBinaryEditorProvider::saveCustomDocumentAs]=====');
        // document: openCustomDocument返回的CustomDocument实例
        // destination: 另存为的路径
        // token.isCancellationRequested: 是否取消操作
        // token.onCancellationRequested: 取消操作触发的事件
        // 返回值: Promise 对象。 
    }

    // vscode热退出时调用
    async backupCustomDocument(document, context, token) {
        console.log('=====[MyBinaryEditorProvider::backupCustomDocument]=====');
        // document: 需要备份的文档
        // context.url: 备份文件时文件的存储位置
        // token.isCancellationRequested: 是否取消操作
        // token.onCancellationRequested: 取消操作触发的事件
    }

    // 执行命令【File: Revert File】时调用
    async revertCustomDocument(document, token) {
        console.log('=====[MyBinaryEditorProvider::revertCustomDocument]=====');
        // document: 需要备份的文档
        // token.isCancellationRequested: 是否取消操作
        // token.onCancellationRequested: 取消操作触发的事件
    }


}

module.exports = MyBinaryEditorProvider;