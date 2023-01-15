chrome.omnibox.onInputStarted.addListener((text, suggest) => {
    const suggestion = `<url><match>https://www.baidu.com</match></url><dim> 百度一下</dim>`
    chrome.omnibox.setDefaultSuggestion({
        description: suggestion
    }, (arg1) => {
        console.log('==========arg1', arg1);
    })
})

chrome.omnibox.onInputChanged.addListener((text, suggest) => {
    console.log(`==========[onInputChanged] text: ${text}==========`)

    // content: 选择该选项时，会将content的内容传递给onInputEntered的参数
    // description: 显示在推荐列表中的文本内容
    suggest([
        { content: 'content 1' + text, description: 'sugestion 1' },
        { content: 'content 2' + text, description: 'sugestion 2' },

    ])
})

chrome.omnibox.onInputEntered.addListener((text) => {
    console.log(`==========[onInputEntered] text: ${text}==========`)
})