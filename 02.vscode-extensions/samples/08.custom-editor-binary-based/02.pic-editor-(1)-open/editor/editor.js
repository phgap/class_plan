(() => {
    const vscode = acquireVsCodeApi();
    // TODO: Lots of things to to.
    class PictureEditor {
        constructor() {
            this.initPage();
        }
        initPage() {
            this.wrapper = document.querySelector('.drawing-canvas');
            this.wrapper.style.position = 'relative';

            this.initialCanvas = document.createElement('canvas');
            this.initialCtx = this.initialCanvas.getContext('2d');
            this.wrapper.append(this.initialCanvas);

        }

        async draw(imgData) {
            // // 用data创建一个img
            // const blob = new Blob([imgData], { 'type': 'image/png' });
            // const url = URL.createObjectURL(blob);
            // const img = document.createElement('img');
            // img.crossOrigin = 'anonymous';
            // img.src = url;
            // console.log('==========url==========', url)
            // img.onload = () => {
            //     this.initialCanvas.width = img.naturalWidth;
            //     this.initialCanvas.height = img.naturalHeight;
            //     console.log('==========[img.onload]==========w', img.naturalWidth)
            //     console.log('==========[img.onload]==========h', img.naturalHeight)
            //     this.initialCtx.drawImage(img, 0, 0);
            //     this.wrapper.appendChild(img);
            // }
            // img.onerror = (e) => {
            //     console.log('==========[img.onerror]==========e', e)
            // }
            console.log('==========[imgData]==========', imgData)
            const blob = new Blob([imgData], { 'type': 'image/png' });
            const url = URL.createObjectURL(blob);
            try {
                const img = document.createElement('img');
                img.crossOrigin = 'anonymous';
                img.src = url;
                await new Promise((resolve, reject) => {
                    img.onload = resolve;
                    img.onerror = reject;
                });

                this.initialCanvas.width = img.naturalWidth;
                this.initialCanvas.height = img.naturalHeight;
                this.initialCtx.drawImage(img, 0, 0);

            } catch (e) {
                console.log('===============e', e);
            } finally {
                URL.revokeObjectURL(url);
            }


        }
    }

    // ⑥
    const editor = new PictureEditor();

    window.addEventListener('message', async (e) => {
        const { type, body, requestId } = e.data;
        // const uint8Array = new Uint8Array(Object.values(body.data))
        const uint8Array = body.data;
        switch (type) {
            case 'init':
                await editor.draw(uint8Array);
                break;
            default:
                break;
        }
    });
    // ④
    vscode.postMessage({ type: 'ready' });
})();