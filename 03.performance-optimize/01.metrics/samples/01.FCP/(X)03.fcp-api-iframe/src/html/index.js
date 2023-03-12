new PerformanceObserver((entryList) => {
    for (const entry of entryList.getEntriesByName('first-contentful-paint')) {
        console.log('FCP candidate:', entry.startTime, entry);
    }
}).observe({ type: 'paint', buffered: true });