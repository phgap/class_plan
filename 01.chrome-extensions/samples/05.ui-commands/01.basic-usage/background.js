chrome.runtime.onInstalled.addListener((reason) => {
    chrome.commands.getAll((commands) => {
        console.log('=====[chrome.runtime.onInstalled]=====commands:', commands);
    })
});

chrome.commands.onCommand.addListener((command) => {
    console.log('=====[chrome.commands.onCommand]===== command:', command);
});