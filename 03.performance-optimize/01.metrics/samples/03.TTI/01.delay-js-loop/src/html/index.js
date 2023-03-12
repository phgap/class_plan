console.time('tti-test');
let sum = 0;
for (let i = 0; i < 100000; i++) {
    sum += i;
    const p = document.createElement('p');
    p.innerText = sum;
    document.body.appendChild(p)
}
console.log(sum);
console.timeEnd('tti-test');