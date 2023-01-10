const {
    SyncWaterfallHook
} = require("tapable");

const hook = new SyncWaterfallHook(["arg1", "arg2", "arg3"]);

hook.tap("PluginName-1", (arg1, a2, a3) => {
    console.log('==========[PluginName-1]========== hook is triggered', arg1, a2, a3);
    return arg1 + a2 + a3;
});
hook.tap("PluginName-2", (arg1, a2, a3, a4) => {
    console.log('==========[PluginName-2]========== hook is triggered', arg1, a2, a3, a4);
});

hook.call(1, 2, 3)

console.log('all linstners handled this event.')
