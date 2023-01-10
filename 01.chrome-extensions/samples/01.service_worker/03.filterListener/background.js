
const filter = {
    url: [
        {
            urlMatches: 'chrome://extensions/',
        },
    ],
};

chrome.webNavigation.onCompleted.addListener(() => {
    console.info("页面加载完成");
}, filter);
