document.querySelector('#set').onclick = async function () {
    const color = document.querySelector('input').value;

    if (color) {
        await chrome.storage.local.set({ color })
        await sendMessageToExtensionDoc(color);
    }
}


document.querySelector('#reload').onclick = async function () {
    const tabs = await chrome.tabs.query({ url: 'https://developer.chrome.com/docs/extensions/*' });

    for (let tab of tabs) {
        chrome.tabs.reload(tab.id);
    }
}

async function sendMessageToExtensionDoc(color) {
    const tabs = await chrome.tabs.query({ url: 'https://developer.chrome.com/docs/extensions/*' });
    // https://developer.chrome.com/docs/extensions/mv3/content_scripts/


    for (let tab of tabs) {
        console.log(tab)
        await chrome.tabs.sendMessage(tab.id, {
            color
        })
    }
}