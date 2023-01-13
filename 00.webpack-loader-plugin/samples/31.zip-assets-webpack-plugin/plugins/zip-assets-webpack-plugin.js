const JSZip = require('jszip');

const zip = new JSZip();

class ZipAssetsWebpackPlugin {
    constructor(options) {
        this.foldername = options.folder;
        this.filename = options.filename;
    }

    apply(compiler) {
        console.log('==========[ZipAssetsWebpackPlugin::apply]==========');
        compiler.hooks.emit.tapAsync('ZipAssetsWebpackPlugin', async (compilation, callback) => {
            const assets = compilation.assets;
            let folder;
            if (this.foldername) {
                folder = zip.folder(this.foldername);
            } else {
                folder = zip;
            }


            // console.log('==========[compiler.hooks.emit.tabAsync]==========assets', assets);
            for (let filename in assets) {
                const source = assets[filename].source();
                // console.log(`==========[${filename}]`, source);
                folder.file(filename, source);
            }
            // console.log('==========folder==========', folder);

            const zipContent = await zip.generateAsync({ type: 'nodebuffer' });

            console.log('==========zipContent==========', zipContent);

            compilation.assets[`${this.filename}.zip`] = new compiler.webpack.sources.RawSource(zipContent);
            callback();
        })
    }
}

module.exports = ZipAssetsWebpackPlugin;