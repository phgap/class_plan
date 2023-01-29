const vscode = require('vscode');
const path = require('path');

function activate(context) {

    console.log('Congratulations, your extension "webview-demo" is now active!');
    let panel = null;

    let disposable = vscode.commands.registerCommand('webview-demo.catCoding', function () {
        console.log('command webview-demo.catCoding is executed!!');
        let column = 1;
        // 创建、显示webview
        if (panel === null) {
            panel = vscode.window.createWebviewPanel(
                'catCoding', // webview panen 标识
                'Cat Coding', // webview的title
                column, //webview显示在vscode的那一栏
                {
                    enableScripts: true
                }
            )
        } else {
            panel.reveal();
            return;
        }

        let counter = 1;

        const updateWebView = (src) => {
            return `
                <h1>webview demo</h1>
                <p>${counter}</p>
                <p>我在第${column}组内显示</p>
                <img src="${src}"/>
                <div><button>发送消息</button></div>
                <div id="msg"></div>
                <script>
                    window.addEventListener('message', (evt) => {
                        const msg = evt.data;
                        document.querySelector('#msg').innerHTML = msg.message;
                    })
                    document.querySelector('button').onclick = function () {
                        const vscode = acquireVsCodeApi();
                        vscode.postMessage({
                            message: 'hello, this is webview'
                        })
                    }
                </script>
            `;
        }

        panel.webview.onDidReceiveMessage(msg => {
            vscode.window.showInformationMessage(msg.message);
        })
        let imgSrc = path.join(context.extensionPath, 'assets/20.png');

        // imgSrc的格式为：/Users/**/assets/20.png
        // 但是在vscode的webview中，要求本地资源路径是以vscode-webview://开头的，所以我们需要转化一下：
        // 先将本地路径，转换为file://的路径
        imgSrc = vscode.Uri.file(imgSrc);
        // 再将file://路径，转换为vscode-webview://
        imgSrc = panel.webview.asWebviewUri(imgSrc);
        console.log(imgSrc)
        panel.webview.html = updateWebView(imgSrc);

        let intervalId = setInterval(() => {
            // counter++;
            // panel.webview.html = updateWebView(imgSrc);
            // console.log('interval is running! counter:', counter);
        }, 1000);

        panel.onDidDispose(() => {
            clearInterval(intervalId);
            intervalId = null;
            panel = null;
        })

        panel.onDidChangeViewState((evt) => {
            console.log(evt)
            // 事件对象中有一个webviewPanel属性，就是发生可视性切换的webview
            // evt.webviewPanel.visible 为true，说明webview当前在前台显示，false为切换到了后台
            // 当visible为false时，我们应该停止interval
            if (evt.webviewPanel.visible) {
                intervalId = setInterval(() => {
                    counter++;
                    panel.webview.html = updateWebView(imgSrc);
                    // console.log('interval is running! counter:', counter);
                }, 1000);
            } else {
                clearInterval(intervalId);
                intervalId = null;
            }
            // evt.webviewPanel.viewColumn 表明webview在编辑区的第几个组中显示
            column = evt.webviewPanel.viewColumn;
        })

    });

    vscode.commands.registerCommand('webview-demo.fromExtension', function () {
        if (panel === null) return;

        panel.webview.postMessage({ message: 'hello, this is a message from extension' })
    })

    context.subscriptions.push(disposable);
}


function deactivate() { }

module.exports = {
    activate,
    deactivate
}