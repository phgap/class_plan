new PerformanceObserver((entryList) => {
    for (const entry of entryList.getEntries()) {
        console.log('========================================');
        console.log('entry\'s name:', entry.name);
        console.log('entry\'s type:', entry.entryType);
        console.log('entry\'s startTime:', entry.startTime);
        console.log('entry\'s duration:', entry.duration);
    }
}).observe({ entryTypes: ["mark", "navigation", "resource", "measure", "paint"] });