
// MyBinaryEditorProvider必须实现下面六个方法：
// openCustomDocument:      为指定文件创建一个document。该函数在文件第一次被打开时调用。
//                          随后document会被传递给resolveCustomEditor,用于在视图中展示内容
// resolveCustomEditor:     每次为一个文件打开一个编辑器，都会调用该函数
// revertCustomDocument:    将文档内容回退到最后一次保存的状态（当用户使用命令【File: Revert File】时触发）
// saveCustomDocument:      保存文档
// saveCustomDocumentAs:    文档另存为
// backupCustomDocument:    备份文档，以避免突然退出导致内容丢失

class MyBinaryEditorProvider {

}

module.exports = MyBinaryEditorProvider;