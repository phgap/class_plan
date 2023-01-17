const article = document.querySelector('article');

console.log('=====[Reading Time]=====article', article);

if(article) {
    const text = article.textContent;
    // console.log('=====[Reading Time]=====text', text);

    // 以空白字符为分隔符，查找单词个数（空格，制表符，换行均属于空白字符）
    const words = text.matchAll(/[^\s]+/g);

    // wordCount是一个可迭代对象。
    console.log('=====[Reading Time]=====words', words.next());

    // 将可迭代对象转换为数组
    const wordArray = Array.from(words);
    // console.log('=====[Reading Time]=====wordArray', wordArray);

    // 数组长度即为单词个数
    const wordCount = wordArray.length;

    // 假设每分钟读60个单词
    const readingTime = Math.round(wordCount / 60);

    // 创建页面元素
    const p = document.createElement('p');
    p.textContent = `⏱️ 需要阅读${readingTime}分钟`;

    const heading = article.querySelector("h1");

    heading.appendChild(p);
   
    // 设置p的文字样式
    p.style.fontSize = '16px'
    p.style.marginTop = '10px';
    p.style.color = '#0a58ca';

}