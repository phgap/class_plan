chrome.runtime.onInstalled.addListener(() => {
    console.log('插件已安装完成');
});

chrome.bookmarks.onCreated.addListener(() => {
    console.log('书签页被创建');
});
