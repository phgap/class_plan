import { onFCP } from 'https://unpkg.com/web-vitals@3?module';

onFCP((info) => {
    console.log('========== iframe window report ==========');
    console.log(info)
    parent.postMessage({
        fcp: info.value
    }, "*");
});