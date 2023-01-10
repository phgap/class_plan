const path = require('path');
const HelloWebpackPlugin = require('./plugins/hello-plugin');

module.exports = {
    entry: './src/index.js',
    plugins: [
        new HelloWebpackPlugin()
    ]
}