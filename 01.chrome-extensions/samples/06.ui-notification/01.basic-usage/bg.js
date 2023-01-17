chrome.notifications.onButtonClicked.addListener((notificationId, btnIndex) => {
    console.log('=====[chrome.notifications.onButtonClicked]=====notificationId:', notificationId);
    console.log('=====[chrome.notifications.onButtonClicked]=====btnIndex:', btnIndex);
});

chrome.notifications.onClicked.addListener((notificationId) => {
    console.log('=====[chrome.notifications.onClicked]=====notificationId:', notificationId);
});

chrome.notifications.onClosed.addListener((notificationId) => {
    console.log('=====[chrome.notifications.onClosed]=====notificationId:', notificationId);
});