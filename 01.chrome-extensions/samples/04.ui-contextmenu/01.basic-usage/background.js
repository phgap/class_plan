chrome.runtime.onInstalled.addListener(async () => {
    const types = [
        'normal',
        'checkbox',
        'separator',
        'radio',
        'radio',
        'radio',
    ]
    for (let i = 0; i < types.length; i++) {
        chrome.contextMenus.create({
            id: `${i + 1}`,
            title: `插件菜单项 ${i + 1}`,
            type: types[i],
            contexts: ['all'],
            checked: true
        });
    }
});

chrome.contextMenus.onClicked.addListener((item, tab) => {
    console.log('==========[chrome.contextMenus.onClicked]==========item', item);
    console.log('==========[chrome.contextMenus.onClicked]==========tab', tab);

});