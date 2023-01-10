class HelloWebpackPlugin {
    apply(compiler) {
        // console.log('==========[HelloWebpackPlugin]', compiler.hooks);
        compiler.hooks.done.tap('HelloWebpackPlugin', (stats) => {
            console.log('==========[HelloWebpackPlugin::compiler.hooks.done.tap]', stats.hasErrors());
        })
    }
}

module.exports = HelloWebpackPlugin;