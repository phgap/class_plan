new PerformanceObserver((entryList) => {
    for (const entry of entryList.getEntries()) {
        const delay = entry.processingStart - entry.startTime;
        console.log('FID candidate:', delay, entry);
    }
}).observe({ type: 'first-input', buffered: true });

console.time('tti-test');
let sum = 0;
for (let i = 0; i < 100000; i++) {
    sum += i;
    const p = document.createElement('p');
    p.innerText = sum;
    document.body.appendChild(p)
}
// console.log(sum);
console.timeEnd('tti-test');