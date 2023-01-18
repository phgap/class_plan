chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log('=====[service worker][chrome.runtime.onMessage]=====request', request);
    console.log('=====[service worker][chrome.runtime.onMessage]=====sender', sender);
})