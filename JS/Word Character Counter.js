//↓↓↓
chapter = document.querySelector('chapter');
var innnnerText = chapter.innerText;
var counttt = innnnerText.length - 10 - chapterName.length;
chapter.innerHTML = `<b style="position:absolute; right:0.7em;top:-0.21em;font-size:8px;">${counttt}</b>${chapter.innerHTML}`;
//↑↑↑
