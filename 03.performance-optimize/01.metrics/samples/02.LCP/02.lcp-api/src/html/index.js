// new PerformanceObserver((entryList) => {
//     for (const entry of entryList.getEntriesByName('first-contentful-paint')) {
//         console.log('FCP candidate:', entry.startTime, entry);
//     }
// }).observe({ type: 'paint', buffered: true });

// can not get lcp metric
// new PerformanceObserver((entryList) => {
//     for (const entry of entryList.getEntries()) {
//         console.log('pant:', entry.startTime, entry);
//     }
// }).observe({ entryTypes: ['paint'] });

// new PerformanceObserver((entryList) => {
//     for (const entry of entryList.getEntries()) {
//         console.log('pant:', entry.startTime, entry);
//     }
// }).observe({ type: 'paint' });

new PerformanceObserver((entryList) => {
    for (const entry of entryList.getEntries()) {
        console.log('LCP candidate:', entry.startTime, entry);
    }
}).observe({ type: 'largest-contentful-paint', buffered: true });

setTimeout(() => {
    const img = new Image();
    img.src = './images/goose.png';
    img.onload = () => {
        document.body.appendChild(img);
    }
    img.style.width = '500px';
    img.style.height = '500px';
}, 1000)