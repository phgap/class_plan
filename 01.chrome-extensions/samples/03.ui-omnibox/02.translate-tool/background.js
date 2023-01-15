chrome.omnibox.onInputStarted.addListener((text, suggest) => {
    const suggestion = `<url><match>https://www.baidu.com</match></url><dim> 百度一下</dim>`
    chrome.omnibox.setDefaultSuggestion({
        description: suggestion
    })
})

chrome.omnibox.onInputChanged.addListener((text, suggest) => {
    console.log(`==========[onInputChanged] text: ${text}==========`)

    // content: 选择该选项时，会将content的内容传递给onInputEntered的参数
    // description: 显示在推荐列表中的文本内容
    suggest([
        { content: `https://translate.google.com/?sl=en&tl=zh-CN&text=${text}&op=translate`, description: '谷歌翻译' },
        { content: `https://fanyi.baidu.com/#auto/zh/${text}`, description: '百度翻译' },

    ])
})

chrome.omnibox.onInputEntered.addListener((text) => {
    console.log(`==========[onInputEntered] text: ${text}==========`)

    const isUrl = text.startsWith('http');
    if (isUrl) {
        chrome.tabs.create({ url: text });
    } else {
        const url = `https://www.baidu.com/s?wd=${text}`
        chrome.tabs.create({ url });
    }

})