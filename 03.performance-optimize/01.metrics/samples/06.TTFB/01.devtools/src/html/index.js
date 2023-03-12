function loadImages() {
    const images = document.querySelectorAll('img[data-src]');

    images.forEach((img) => {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
    });
}

window.addEventListener('load', loadImages);
