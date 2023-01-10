chrome.action.setBadgeText({ text: 'On' })
chrome.action.setBadgeBackgroundColor({ color: 'yellow' })

setTimeout(() => {
    chrome.action.setBadgeText({ text: '' })
}, 3000)