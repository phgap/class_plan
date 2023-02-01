const vscode = require('vscode');

class PictureEditorDocument {
    static async readFile(uri) {
        const data = await vscode.workspace.fs.readFile(uri);
        return new Uint8Array(data);
    }

    constructor(uri, data) {
        this.uri = uri;
        this._data = data;

    }

    dispose() {
        console.log('=====[MyCustomDocument::dispose]=====')
    }
}

module.exports = PictureEditorDocument