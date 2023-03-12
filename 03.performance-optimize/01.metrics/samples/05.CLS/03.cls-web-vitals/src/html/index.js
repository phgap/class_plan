import { onCLS } from 'https://unpkg.com/web-vitals@3?module';

// 在所有需要汇报 CLS 的情况下
// 对其进行测量和记录。
onCLS(console.log);


function loadImages() {
    const images = document.querySelectorAll('img[data-src]');

    images.forEach((img) => {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
    });
}



window.addEventListener('load', loadImages);

