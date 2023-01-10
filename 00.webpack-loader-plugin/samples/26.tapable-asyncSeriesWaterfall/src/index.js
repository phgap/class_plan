const {
    AsyncSeriesWaterfallHook
} = require("tapable");

const hook = new AsyncSeriesWaterfallHook(["arg1", "arg2", "arg3"]);

// hook.tapPromise("PluginName-1", (a1, a2, a3) => {
//     console.log('==========[PluginName-1]========== hook is triggered', a1, a2, a3);
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             console.log('==========[PluginName-1]========== done');
//             resolve(a1 + a2 + a3);
//         }, 1000)
//     })
// })

// hook.tapPromise("PluginName-2", (a1, a2, a3) => {
//     console.log('==========[PluginName-2]========== hook is triggered', a1, a2, a3);
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             console.log('==========[PluginName-2]========== done');
//             resolve();
//         }, 500)
//     })
// });

hook.tapAsync("PluginName-1", (a1, a2, a3, cb) => {
    console.log('==========[PluginName-1]========== hook is triggered', a1, a2, a3);
    setTimeout(() => {
        console.log('==========[PluginName-1]========== done');
        cb(null, a1 + a2 + a3);
    }, 1000)
})

hook.tapAsync("PluginName-2", (a1, a2, a3, cb) => {
    console.log('==========[PluginName-2]========== hook is triggered', a1, a2, a3);
    setTimeout(() => {
        console.log('==========[PluginName-2]========== done');
        cb();
    }, 500)
})

hook.callAsync(1, 2, 3, err => {
    console.log('all linstners handled this event.');
})

