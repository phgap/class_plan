const COMMANDS = {
    TABS_FORWARD: 'flip-tabs-forward',  // 活动tab向右移动
    TABS_BACKFORDS: 'flip-tabs-backwords'   // 活动tab向左移动
}

chrome.runtime.onInstalled.addListener((reason) => {
    chrome.commands.getAll((commands) => {
        console.log('=====[chrome.commands.getAll]=====commands', commands);

        for (const { name, shortcut } of commands) {
            if (shortcut === '') {
                console.error(`command ${name} has no shortcut`)
            }
        }
    })
});

chrome.commands.onCommand.addListener(async (command) => {
    console.log('=====[chrome.commands.onCommand]===== command:', command);
    if (command === COMMANDS.TABS_FORWARD) {
        await flipTab('forward');
    } else {
        await flipTab('backwards');
    }
});

// 切换当前的tab
async function flipTab(direction) {
    // 取得所有tab
    const tabs = await chrome.tabs.query({ currentWindow: true });
    console.log('=====[flipTab]=====tabs', tabs);

    // 取得当前活动的tab
    const activeTabIndex = tabs.findIndex(tab => tab.active);
    console.log('=====[flipTab]=====activeTabIndex', activeTabIndex);

    // 计算下一个活动tab的索引
    let newIndex = -1;
    if (direction === 'forward') {
        // 向右移动
        newIndex = activeTabIndex === tabs.length - 1 ? 0 : activeTabIndex + 1;
    } else {
        // 向左移动
        newIndex = activeTabIndex === 0 ? tabs.length - 1 : activeTabIndex - 1;
    }

    // 将指定的索引对应的tab更新为活动tab
    // 第一个参数是tabid，第二个参数是tab的相关配置
    chrome.tabs.update(tabs[newIndex].id, {
        active: true
    });
}