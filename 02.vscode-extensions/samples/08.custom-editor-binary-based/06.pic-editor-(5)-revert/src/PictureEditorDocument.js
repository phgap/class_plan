const vscode = require('vscode');

class PictureEditorDocument {
    static async readFile(uri) {
        const data = await vscode.workspace.fs.readFile(uri);
        return new Uint8Array(data);
    }

    constructor(uri, data) {
        this.uri = uri;
        this._data = data;
        this._edits = [];
        this._savedEdits = [];
    }

    makeEdit(edit, provider) {
        console.log('=====[PictureEditorDocument::makeEdit]=====edit', edit);
        this._edits.push(edit);

        provider.eventEmitter.fire({
            document: this,
            label: 'rotate',
            undo: () => {
                console.log('=====[edit\'s undo]=====', edit);
                this._edits.pop();
                provider.webviewPanel.webview.postMessage({
                    type: 'update',
                    body: this._edits.slice(-1)[0] || { type: 'rotate', degrees: 0 }
                })
            },
            redo: () => {
                console.log('=====[edit\'s redo]=====', edit);
                provider.webviewPanel.webview.postMessage({
                    type: 'update',
                    body: edit
                })
            }
        })
    }

    // ⑤
    async saveFile(uri, fileData) {
        await vscode.workspace.fs.writeFile(uri, fileData);
    }

    dispose() {
        console.log('=====[MyCustomDocument::dispose]=====')
    }
}

module.exports = PictureEditorDocument