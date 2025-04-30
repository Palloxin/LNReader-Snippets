//↓↓↓
chapter = document.querySelector('#LNReader-chapter');
var inerText = chapter.innerText;
var counttt = inerText.length - 10 - reader.chapter.name.length;
chapter.innerHTML = `<b style="position:absolute; right:0.7em;top:-0.21em;font-size:8px;">${counttt}</b>${chapter.innerHTML}`;
//↑↑↑ 
