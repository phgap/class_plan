// 'https://picsum.photos/200/300?random=1'


function loadImages() {
    const images = document.querySelectorAll('img[data-src]');

    images.forEach((img) => {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
    });
}

window.addEventListener('load', loadImages);
