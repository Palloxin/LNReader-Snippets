/////★★★↓↓ Chapter-titles-hider
spoooiler = document.querySelector(".nextButton");
if(spoooiler) {spoooiler.innerText = "———Next Chapter———"}

chapter = document.querySelector('chapter');
chapter.innerHTML = chapter.innerHTML
//preparatory
.replace(/\&nbsp\;/g, '')
.replace(/(?<=<\/?(?:p|h[1-9]|div|span)>)\s+/g, '')
.replace(/\s+(?=<\/?(?!b\b|strong)[a-z]+>)/g, '')
.replace(/(?<!^)<p><\/p>(?!$)/g, '')
//
.replace(/<\/h([1-4])><\/?h\1>/, ' ')
.replace(/^((?:<p><\/p>|<(?!p>)[a-z]+>)?[^<]*(?:<input[^\>]+\>)?(?:<\w+><\/\w+>)*)/, '$1π√')
.replace(/π√(<(h[1-4]|p)>(?:<(?:span|strong)>)?)(( ?Chapter )?(\d{1,4}\b)(\W+(?=\w))?(.+?))(<\/\2>)((?=(.*?<p>))\10((?:\4|\5|\6|\7)(?:\5(?<=\4\5))?\6?\7?\.?)<\/p>)?/i, (_0,_1,_2,_3,_4,_5,_6,_7,_8,_9,_10,_11) => {
if(_9 === undefined)
return `₱¥${_1}<spo>${_3}${_8}₱¥`;
else
return `₱¥${_1}<spo>${_3}${_8}${_10}<spo>${_11}₱¥`})
.replace(/₱¥([^₱]+)₱¥/, (_, a) => `${a.replace(/<(h[1-4]|p)>([^]+?)<\/\1>/, '<h1>$2<\/h1>')}`)
.replace(/π√(<(p|h[1-5])>)([^]+?)(<\/\2>)/, (_, a,b,c,d)=> {
const bas = c.replace(/(?:<\/?\w+>|\.$)/g, '')
const dare = chapterName.match(bas);
if(dare) return `${a}<spo>${chapterName}${d}`;
else return `${_}`;})
.replace(/π√/, '')

;
////TEST-STRINGs:
//``<h3>Chapter 148: </h3><h3>Success</h3>``
//``<p><strong>1858 Omniscience</strong></p>``
//``<h2>Chapter 94 – 094. Maehwa Sword </h2><p>094. Maehwa Sword</p>``
//``<h2>Chapter 001 – 001. Bob Sits Down</h2><p>202. Bob sits down.</p>``
//``Brawl.`` (use chapterName to check)
//``
/////★★★↑↑