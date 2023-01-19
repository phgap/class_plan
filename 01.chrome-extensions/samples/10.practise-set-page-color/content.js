(async () => {
    const { color } = await chrome.storage.local.get('color');
    console.log('=====color=====', color);
    if (color) {
        document.body.style.background = color;
    }
})();

chrome.runtime.onMessage.addListener(async (req) => {
    console.log('==========[chrome.runtime.onMessage]==========req:', req);
    document.body.style.background = req.color;
})