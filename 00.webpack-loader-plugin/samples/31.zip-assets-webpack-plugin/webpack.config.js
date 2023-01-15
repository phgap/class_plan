const path = require('path');
const ZipAssetsWebpackPlugin = require('./plugins/zip-assets-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
        clean: true
    },
    plugins: [
        new ZipAssetsWebpackPlugin({
            filename: 'compressed'
        })
    ],
    optimization: {
        // Instruct webpack not to obfuscate the resulting code
        minimize: false,
        splitChunks: false,
    },
}