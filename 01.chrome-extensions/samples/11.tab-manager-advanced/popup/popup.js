"use strict";

window.onload = initPage;

async function initPage() {
    // 取得所有chrome的windows. 
    // 参数{ populate: true }时，会将windows内的所有tab页信息返回
    const windows = await chrome.windows.getAll({ populate: true });

    // 更新header的title
    const windowCount = windows.length;
    const tabCount = windows.reduce((total, w) => total + w.tabs.length, 0);
    document.querySelector('.header .tab-info').innerText = `${windowCount}个窗口 共${tabCount}个tab页`

    // 创建窗口
    createWindows(windows);
}
function createWindows(windows) {
    const template = document.querySelector('#window-template');
    const normalWindowArr = [];
    const minimizeWindowArr = [];

    for (let i in windows) {
        const w = windows[i];

        const windowEl = template.content.firstElementChild.cloneNode(true);
        // 设置window的title
        windowEl.querySelector('.window-title').innerHTML = createWindowTitle(w.tabs);

        // 点击window时，设置当前窗口
        windowEl.onclick = async () => {
            await chrome.windows.update(w.id, { focused: true });
        }

        // 绑定工具按钮的点击事件
        windowEl.querySelector('.add').onclick = async (evt) => {
            evt.stopPropagation();
            await chrome.tabs.create({ windowId: w.id });
            await updatePage();
        }
        windowEl.querySelector('.minimize').onclick = async (evt) => {
            evt.stopPropagation();
            await chrome.windows.update(w.id, {
                state: 'minimized'
            });
            await updatePage();

        }
        windowEl.querySelector('.close').onclick = async (evt) => {
            evt.stopPropagation();
            await chrome.windows.remove(w.id);
            setTimeout(async () => {
                await updatePage();
            }, 50);
        }

        // 创建tab
        windowEl.querySelector('.window-main').append(...createTabs(w.tabs));

        if (w.state === 'minimized') {
            minimizeWindowArr.push(windowEl)
        } else {
            normalWindowArr.push(windowEl)
        }
    }

    if (normalWindowArr.length > 0) {
        document.querySelector('.window-container .normal').append(...normalWindowArr);
    }

    if (minimizeWindowArr.length > 0) {
        document.querySelector('.split').classList.remove('hidden');
        document.querySelector('.window-container .mini').append(...minimizeWindowArr);
    } else {
        document.querySelector('.split').classList.add('hidden');
    }
}

function createWindowTitle(tabs) {
    const windowTitles = tabs.map(tab => {
        if (tab.url === '') return '';

        let hostname = new URL(tab.url).hostname;
        if (hostname.startsWith('chrome://')) {
            hostname = hostname.split('chrome://').pop()
        } else {
            hostname = hostname.replace("www.", "");
            const regex = new RegExp(/(\.[^\.]{0,2})(\.[^\.]{0,2})(\.*$)|(\.[^\.]*)(\.*$)/);
            hostname = hostname
                .replace(regex, "")
                .split(".")
                .pop();
        }



        return hostname
    });

    const titleSet = new Set(windowTitles.filter(title => title !== ''));
    const titles = Array.from(titleSet);

    if (titles.length > 2) {
        return `${titles[0]} and ${titles.length - 1} more`
    }

    return titles.join(', ');
}

function createTabs(tabs) {
    const template = document.querySelector('#tab-template');

    const tabArray = [];

    for (let index = 0; index < tabs.length; index++) {
        const tab = tabs[index];

        if (index !== 0 && index % 5 === 0) {
            const newliner = document.createElement('div');
            newliner.classList.add('newliner');
            tabArray.push(newliner);
        }

        const tabEl = template.content.firstElementChild.cloneNode(true);

        // 设置tab的图标
        let url = '';
        if (tab.favIconUrl) {
            url = `url("${tab.favIconUrl}")`
        } else {
            url = `url("../images/extensions.png")`;
        }

        // 点击tab，切换tab
        tabEl.onclick = async () => {
            await chrome.tabs.update(tab.id, { active: true });
            await chrome.windows.update(tab.windowId, { focused: true });
            await updatePage();
        }

        tabEl.style.backgroundImage = url;

        tabArray.push(tabEl);
    }

    return tabArray;
}

async function updatePage() {
    document.querySelector('.window-container .normal').innerHTML = '';
    document.querySelector('.window-container .mini').innerHTML = '';
    document.querySelector('.split').classList.add('hidden');
    await initPage();
}

