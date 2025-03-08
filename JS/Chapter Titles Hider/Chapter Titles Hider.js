/////★★★↓↓ Chapter-titles-hider
spoooiler = document.querySelector(".next-button");
if(spoooiler) {spoooiler.innerText = "———Next Chapter———"}

function rgbToHsl(r,g,b){r/=255;g/=255;b/=255;let max=Math.max(r,g,b),min=Math.min(r,g,b),h,s,l=(max+min)/2,d=max-min;if(d===0){h=s=0;}else{s=l<0.5?d/(max+min):d/(2-max-min);switch(max){case r:h=(g-b)/d+(g<b?6:0);break;case g:h=(b-r)/d+2;break;case b:h=(r-g)/d+4;break;}h/=6;}return[Math.round(h*360),Math.round(s*100),Math.round(l*100)];}
let [r, g, b] = document.body.computedStyleMap().get("background-color").toString() .match(/\d+/g,).map(n=>+n);
let [hh, ss, ll] = rgbToHsl(r, g, b)

chapter = document.querySelector('#LNReader-chapter');
chapter.innerHTML = chapter.innerHTML
//preparatory
.replace(/(<h[1-8]) [^>]+>/g, '$1>')
.replace(/&nbsp;/g, ' ')//
.replace(/<title>[^<]*<\/title>/, '')//epubs
.replace(/^(?:(?=<)[^\?\.,A-Z”“]*?<\/?div\b[^>]*>\s*)+/, '')
.replace(/(<\/?(?:p|h[1-9]|div|span(?!>\s+<i>))>)\s+/g, '$1')//
.replace(/\s+(?=<\/?(?:p|h[1-9]|div|(?<=<\/)span)>)/g, '')//
.replace(/<p><\/p>/g, '')//
.replace(/^[\s\n]*|$/g, '<p></p>')//
//
.replace(/<\/h([1-4])><\/?h\1>/ , ' ')
.replace(/^((?:<p><\/p>|<(?!(?:p|h[1-4])>)[^>]*>)?[^<]*(?:<input[^>]+>)?(?:\s*<[^>]+>\s*<\/[^>]+>)*)/, '$1π√')//keep $1
.replace(/π√<(h[1-4]|p)>(?:<(?:span|strong|b)>)?(([^C]?Chapter\W+)?(\d{1,4}\b(?:\.\d)?)(\W+(?=\w))?(.+?))(<\/\1>)((?=(.*?<p>))\9((?:\3|\4|\5|\6)(?:\4(?<=\3\4))?\5?\6?\.?)<\/p>)?/i, (_0,_1,_2,_3,_4,_5,_6,_7,_8,_9,_10) => {
	if(_8 === undefined)
		return `⸙<${_1}>~~<spo>${_2}${_7}⸙`;
	else
		return `⸙<${_1}>~~<spo>${_2}${_7}${_9}~~<spo>${_10}⸙`})
.replace(/⸙([^⸙]+)⸙/, (_, a) => `${a.replace(/<(h[1-4]|p)>([^]+?)<\/\1>/, '<h1>$2</h1>')}`)
.replace(/π√<(p|h[1-5])>([^]+?)(?=<\/\1>)/, (_, a,b)=> {
	const bas = b.replace(/(?:<\/?[a-z]+>|\.$)/g, '')
	let dare = reader.chapter.name.includes(bas);
	if(dare) return `<h1>~~<spo>${reader.chapter.name}<\/spo></h1>`;
	else return `${_}`})
.replace(/~~<spo>/g, (_) => `<spo style=\"background: hsl(${hh}, ${ss}%, ${+ll-2}%)\">`)
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
