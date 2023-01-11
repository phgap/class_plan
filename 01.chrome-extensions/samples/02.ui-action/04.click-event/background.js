// 必须在manifest.json中声明action，否则获取不到chrome下的action对象

// 指定一个popup文件后，事件不会触发
chrome.action.onClicked.addListener(() => {
    console.log('插件图标被点击了');
})