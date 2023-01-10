const {
    AsyncSeriesHook
} = require("tapable");

const hook = new AsyncSeriesHook(["arg1", "arg2", "arg3"]);

hook.tapPromise("PluginName-1", (a1, a2, a3) => {
    console.log('==========[PluginName-1]========== hook is triggered', a1, a2, a3);
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('==========[PluginName-1]========== done');
            resolve();
        }, 1000)
    })
})

hook.tapPromise("PluginName-2", (a1, a2, a3) => {
    console.log('==========[PluginName-2]========== hook is triggered', a1, a2, a3);
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('==========[PluginName-2]========== done');
            resolve();
        }, 500)
    })
})
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

hook.tapPromise("PluginName-3", async (a1, a2, a3) => {
    console.log('==========[PluginName-3]========== hook is triggered', a1, a2, a3);
    await sleep(3000);
    console.log('==========[PluginName-3]========== done');
})

hook.callAsync(1, 2, 3, err => {
    console.log('all linstners handled this event.');
})

