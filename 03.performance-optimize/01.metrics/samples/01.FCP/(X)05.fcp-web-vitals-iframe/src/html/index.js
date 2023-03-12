import { onFCP } from 'https://unpkg.com/web-vitals@3?module';

onFCP((info) => {
    console.log('========== top window report ==========');
    console.log(info)
});

window.addEventListener('message', ({ data }) => {
    console.log(data.fcp);
})