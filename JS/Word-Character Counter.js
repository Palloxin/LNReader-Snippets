//↓↓↓
chapter = document.querySelector('#LNReader-chapter');
var inerText = chapter.innerHTML.replace(/&nbsp;/g, ' ').replace(/<[^>]+>/g, '').replace(/&(?:lt|gt|amp);/g, '').replace(/\s\s+/g, ' ');
var counttt = inerText.match(/\S+/g).length;
chapter.innerHTML = `<b style="position:absolute; right:0.7em;top:-0.21em;font-size:8px;">${counttt}</b>${chapter.innerHTML}`;
//↑↑↑ 
