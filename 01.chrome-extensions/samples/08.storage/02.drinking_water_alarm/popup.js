async function setAlarm(evt) {
    const seconds = evt.target.value;
    // 设置badge
    chrome.action.setBadgeText({ text: 'ON' });

    // 设置storage
    await chrome.storage.sync.set({ seconds });

    // 设置一个闹钟
    await chrome.alarms.create({
        when: Date.now() + seconds * 1000
    })

    // 关闭popup页
    window.close();
}

function clearAlarm() {
    chrome.action.setBadgeText({ text: 'OFF' });
}

document.querySelector('#sec15').onclick = setAlarm;
document.querySelector('#sec30').onclick = setAlarm;
document.querySelector('#sec60').onclick = setAlarm;
document.querySelector('#cancle').onclick = clearAlarm;