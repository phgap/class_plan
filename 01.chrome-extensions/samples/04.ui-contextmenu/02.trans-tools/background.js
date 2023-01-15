chrome.runtime.onInstalled.addListener(async () => {
    chrome.contextMenus.create({
        id: `trans-google`,
        title: `谷歌翻译`,
        type: 'normal',
        contexts: ['selection']
    });
    chrome.contextMenus.create({
        id: `trans-baidu`,
        title: `百度翻译`,
        type: 'normal',
        contexts: ['selection']
    });

});

chrome.contextMenus.onClicked.addListener((item, tab) => {
    let url = '';
    let text = item.selectionText;
    switch (item.menuItemId) {
        case 'trans-google':
            url = `https://translate.google.com/?sl=auto&tl=zh-CN&text=${text}&op=translate`
            break;
        case 'trans-baidu':
            url = `https://fanyi.baidu.com/#en/zh/${text}`
            break;
            break;
    }
    chrome.tabs.create({ url, index: tab.index + 1 });
});