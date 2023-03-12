// function loadImages() {
//     const images = document.querySelectorAll('img[data-src]');

//     images.forEach((img) => {
//         img.src = img.dataset.src;
//         img.removeAttribute('data-src');
//     });
// }

// window.addEventListener('load', loadImages);

// 其中 navigation 类型观察器会在页面导航期间触发，包括页面刷新、地址栏 URL 更改和通过浏览器历史记录访问页面等。当该观察器被触发时，会提供一个 PerformanceNavigationTiming 对象，该对象包含有关导航期间发生的事件的性能计时信息。

// 该观察器会在导航期间触发两次，一次是导航开始时，另一次是导航结束时。这两次触发会提供两个不同的 PerformanceNavigationTiming 对象，分别表示导航开始和导航结束时的性能计时信息。在每个对象中，可以访问许多不同的计时属性，例如 fetchStart、responseStart、responseEnd、domInteractive 等，这些属性提供了有关页面加载和渲染的详细信息。

// 您可以使用这些性能计时信息来了解页面加载和渲染过程中的瓶颈和优化点。例如，您可以查看 responseStart 和 responseEnd 之间的时间差来了解服务器响应页面请求所需的时间，或者查看 domInteractive 和 domContentLoadedEventEnd 之间的时间差来了解页面 JavaScript 代码的执行时间。

new PerformanceObserver((entryList) => {
    const entries = entryList.getEntries();
    for (const entry of entries) {
        console.log(`[${entry.entryType}] TTFB: ${entry.responseStart}`);
    }
    // console.log(`[navigation] TTFB:`, pageNav);
}).observe({
    type: 'navigation',
    buffered: true
});


// 如果跨源服务器未能设置 Timing-Allow-Origin header，则跨域请求的 TTFB 将无法在实际场景中测量。
new PerformanceObserver((entryList) => {
    const entries = entryList.getEntries();

    for (const entry of entries) {
        // Some resources may have a responseStart value of 0, due
        // to the resource being cached, or a cross-origin resource
        // being served without a Timing-Allow-Origin header set.
        if (entry.responseStart > 0) {
            console.log(`[${entry.entryType}] TTFB: ${entry.responseStart}`, entry.name);
        }
    }
}).observe({
    type: 'resource',
    buffered: true
});
