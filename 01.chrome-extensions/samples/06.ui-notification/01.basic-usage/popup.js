let notificationId = 0;

document.querySelector('#create').onclick = () => {
    notificationId++;
    chrome.notifications.create(`${notificationId}`, {
        type: 'basic',
        iconUrl: 'stay_hydrated.png',
        title: `通知 - ${notificationId}`,
        message: `这是第${notificationId}次通知你`,
        buttons: [
            { title: 'Keep it Flowing.' }
        ],
        priority: 0
    });
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