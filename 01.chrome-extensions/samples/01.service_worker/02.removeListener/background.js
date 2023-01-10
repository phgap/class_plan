
chrome.bookmarks.onCreated.addListener(function handler() {
    console.log('书签页被创建');
    chrome.bookmarks.onCreated.removeListener(handler);
});
