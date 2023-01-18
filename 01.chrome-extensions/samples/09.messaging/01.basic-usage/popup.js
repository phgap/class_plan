document.querySelector('#send-message').onclick = async () => {
    // 从popup页面(extension)向content script(tab页)发送消息
    const [currentTab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
    const resp = await chrome.tabs.sendMessage(currentTab.id, {
        greeting: 'How do you do from popup!'
    });
    if (resp) {
        const h1 = document.createElement('h1');
        h1.innerHTML = resp.greeting;
        h1.style.background = 'black';
        h1.style.color = 'yellow';
        document.body.appendChild(h1);
    }
    await chrome.runtime.sendMessage({
        greeting: 'How do you do from popup!'
    });
}
document.querySelector('#post-message').onclick = async () => {
    // 从popup页面(extension)向content script(tab页)发送消息
    const [currentTab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
    const port = await chrome.tabs.connect(currentTab.id);
    port.onMessage.addListener((resp) => {
        const h1 = document.createElement('h1');
        h1.innerHTML = resp.greeting;
        h1.style.background = 'black';
        h1.style.color = 'yellow';
        document.body.appendChild(h1);
    });
    port.postMessage({ greeting: 'How do you do from popup (postMessage)' })
}