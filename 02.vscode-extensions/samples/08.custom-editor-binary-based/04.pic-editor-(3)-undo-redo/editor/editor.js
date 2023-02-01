(() => {
    const vscode = acquireVsCodeApi();
    // TODO: Lots of things to to.
    class PictureEditor {
        constructor() {
            this.currentRotate = 0;
            this.img = null;
            this.initPage();
        }
        initPage() {
            this.wrapper = document.querySelector('.drawing-canvas');
            this.wrapper.style.position = 'relative';

            this.initialCanvas = document.createElement('canvas');
            this.initialCtx = this.initialCanvas.getContext('2d');
            this.wrapper.append(this.initialCanvas);


            document.querySelector('button.clockwise').onclick = (e) => {
                // 顺时针
                e.stopPropagation();
                const degrees = this.currentRotate + 90;
                this.rotate(degrees);

                vscode.postMessage({
                    type: 'rotate',
                    degrees
                })
            }

            document.querySelector('button.anticlockwise').onclick = (e) => {
                // 逆时针
                e.stopPropagation();
                const degrees = this.currentRotate - 90;
                this.rotate(degrees);

                vscode.postMessage({
                    type: 'rotate',
                    degrees
                })
            }

        }

        rotate(degrees) {
            this.initialCtx.clearRect(0, 0, this.initialCanvas.width, this.initialCanvas.height);
            this.initialCtx.save();
            this.initialCtx.translate(this.initialCanvas.width / 2, this.initialCanvas.height / 2);
            this.initialCtx.rotate(degrees * Math.PI / 180);
            this.initialCtx.drawImage(this.img, -(this.img.width / 2), -(this.img.height / 2));
            this.initialCtx.restore();
            this.currentRotate = degrees;
        }

        async draw(imgData) {
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

                this.img = img;

                this.initialCanvas.width = img.naturalWidth;
                this.initialCanvas.height = img.naturalHeight;
                this.initialCtx.drawImage(img, 0, 0);

            } catch (e) {
                console.log('===============e', e);
            } finally {
                // URL.revokeObjectURL(url);
            }


        }
    }

    const editor = new PictureEditor();

    window.addEventListener('message', async (e) => {
        const { type, body } = e.data;
        switch (type) {
            case 'init':
                await editor.draw(body.data);
                break;
            // ③
            case 'update':
                console.log('=========[webview message handler:: update]==========')
                editor.rotate(body.degrees);
                break;
            default:
                break;
        }
    });
    vscode.postMessage({ type: 'ready' });
})();