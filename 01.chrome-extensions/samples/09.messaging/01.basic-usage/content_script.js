chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
    const h1 = document.createElement('h1');
    h1.innerHTML = request.greeting;
    h1.style.position = 'absolute';
    h1.style.right = 0;
    h1.style.top = 0;
    h1.style.background = 'black';
    h1.style.color = 'yellow';
    document.body.appendChild(h1);
    sendResponse({ greeting: 'How do you do from content script' });
    await chrome.runtime.sendMessage({ greeting: 'How do you do from content script' })
})

chrome.runtime.onConnect.addListener((port) => {
    port.onMessage.addListener(request => {
        const h1 = document.createElement('h1');
        h1.innerHTML = request.greeting;
        h1.style.position = 'absolute';
        h1.style.right = 0;
        h1.style.top = 0;
        h1.style.background = 'black';
        h1.style.color = 'yellow';
        document.body.appendChild(h1);
        port.postMessage({ greeting: 'How do you do from content script (postMessage)' })
    })
})