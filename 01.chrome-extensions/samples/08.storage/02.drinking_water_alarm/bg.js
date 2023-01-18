chrome.alarms.onAlarm.addListener(() => {
    chrome.action.setBadgeText({ text: '' });

    chrome.notifications.create({
        type: 'basic',
        iconUrl: 'stay_hydrated.png',
        title: '多喝开水',
        message: '到时间喝点开水了',
        buttons: [
            { title: '继续提醒' }
        ]
    })
});

chrome.notifications.onButtonClicked.addListener(async () => {
    // 设置badge
    chrome.action.setBadgeText({ text: 'ON' });

    // 取得storage
    const { seconds } = await chrome.storage.sync.get('seconds');

    // 设置一个闹钟
    await chrome.alarms.create({
        when: Date.now() + seconds * 1000
    })
})