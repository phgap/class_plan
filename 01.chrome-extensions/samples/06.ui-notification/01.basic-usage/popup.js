let notificationId = 0;

function createBasicNotification() {
    chrome.notifications.create(`${notificationId}`, {
        type: 'basic',
        iconUrl: 'stay_hydrated.png',
        title: `通知 - ${notificationId}`,
        message: `这是第${notificationId}次通知你`,
        buttons: [
            { title: 'Keep it Flowing-1.' },
            { title: 'Keep it Flowing-2.' },
            { title: 'Keep it Flowing-3.' }
        ],
        priority: 0
    });
}

function createImageNotification() {
    // 图片对于mac用户是不可见的，所以在mac上，与普通的通知没什么区别
    chrome.notifications.create(`${notificationId}`, {
        type: 'image',
        imageUrl: 'stay_hydrated.png',
        iconUrl: 'stay_hydrated.png',
        title: `通知 - ${notificationId}`,
        message: `这是第${notificationId}次通知你`,
        priority: 0
    });
}

function createListNotification() {
    // mac 用户只能看到第一个item
    chrome.notifications.create(`${notificationId}`, {
        type: 'list',
        iconUrl: 'stay_hydrated.png',
        title: `通知 - ${notificationId}`,
        message: `这是第${notificationId}次通知你`,
        items: [
            {
                title: 'item-1-title',
                message: 'item-1-message'
            },
            {
                title: 'item-2-title',
                message: 'item-2-message'
            },
        ],
        priority: 0
    });
}

function createProgressNotification() {
    // mac上该类型的消息不显示
    chrome.notifications.create(`progress-${notificationId}`, {
        type: 'progress',
        iconUrl: 'stay_hydrated.png',
        title: `progress notification title`,
        message: `progress notification message`,
        progress: 20,
    });
}

document.querySelector('#create').onclick = () => {
    notificationId++;
    createBasicNotification();
    // createImageNotification();
    // createListNotification();
    // createProgressNotification();
}

document.querySelector('#clear').onclick = () => {
    chrome.notifications.clear(`${notificationId}`);
}

document.querySelector('#clear-all').onclick = () => {

    chrome.notifications.getAll((notifications) => {
        for (let id in notifications) {
            chrome.notifications.clear(id);
        }
    });
}

document.querySelector('#update').onclick = () => {
    chrome.notifications.update(`${1}`, {
        message: `这是第${notificationId}次通知你，但是被篡改过的。`,
    });
}

document.querySelector('#getAll').onclick = () => {
    chrome.notifications.getAll((notifications) => {
        console.log('=====[chrome.notifications.getAll]=====notifications:', notifications)
    });
}