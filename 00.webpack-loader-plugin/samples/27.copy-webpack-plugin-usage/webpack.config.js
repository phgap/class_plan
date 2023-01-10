const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        clean: true
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: './assets/1.txt', to: 'assets' }
            ]
        })
    ]
}