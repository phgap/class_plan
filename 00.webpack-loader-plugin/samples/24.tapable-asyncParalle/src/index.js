const {
    AsyncParallelHook
} = require("tapable");

const hook = new AsyncParallelHook(["arg1", "arg2", "arg3"]);

// hook.tapAsync("PluginName-1", (arg1, a2, a3, cb) => {
//     console.log('==========[PluginName-1]========== hook is triggered', arg1, a2, a3);
//     setTimeout(() => {
//         console.log('==========[PluginName-1]========== done');
//         cb();
//     }, 1000)
// });
// hook.tapAsync("PluginName-2", (arg1, a2, a3, cb) => {
//     console.log('==========[PluginName-2]========== hook is triggered', arg1, a2, a3);
//     setTimeout(() => {
//         console.log('==========[PluginName-2]========== done');
//         cb();
//     }, 500)
// });

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

console.log('[fake] all linstners handled this event.');

