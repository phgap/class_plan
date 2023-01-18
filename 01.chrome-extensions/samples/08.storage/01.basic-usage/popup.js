const keyInput = document.querySelector('#key');
const valueInput = document.querySelector('#value');

document.querySelector('#set').onclick = async () => {
    const key = keyInput.value;
    const value = valueInput.value;
    if (key && value) {
        await chrome.storage.local.set({
            [key]: value
        });
    } else {
        alert('请输入key和value')
    }

}

document.querySelector('#get').onclick = async () => {
    const key = keyInput.value;
    let value = '';
    if (key) {
        // 参数可以是数组，可以是字符串
        value = await chrome.storage.local.get([key]);
    } else {
        value = await chrome.storage.local.get();
    }
    document.querySelector('#result').innerHTML = JSON.stringify(value);

}

document.querySelector('#remove').onclick = async () => {
    const key = keyInput.value;
    if (key) {
        // 参数可以是数组，可以是字符串
        await chrome.storage.local.remove([key]);
    } else {
        alert('请输入key')
    }

}

document.querySelector('#clear').onclick = async () => {
    await chrome.storage.local.clear();
}