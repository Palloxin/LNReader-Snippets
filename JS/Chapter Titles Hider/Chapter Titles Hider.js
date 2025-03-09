/////★★★↓↓ Chapter-titles-hider
spoooiler = document.querySelector(".next-button");
if(spoooiler) {spoooiler.innerText = "———Next Chapter———"}

function rgbHsl(r,g,b){r/=255;g/=255;b/=255;var M=Math.max(r,g,b),m=Math.min(r,g,b),d=M-m,L=(M+m)*0.5,H=0,S=0;if(d!==0){S=d/(1-Math.abs(2*L-1));switch(M){case r:H=(g-b)/d+(g<b?6:0);break;case g:H=(b-r)/d+2;break;case b:H=(r-g)/d+4;break}H*=60}if(H<0){H+=360}return[H,S,L]}
let [r,g,b] = document.body.computedStyleMap().get("background-color").toString() .match(/[\d\.]+/g).map(n=>+n);let [hh,ss,ll] = rgbHsl(r,g,b);
let ba = 2;

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
.replace(/~~<spo>/g, (_) => `<spo style="background: hsl(${hh}, ${ll<80?ss:ss-3}%, ${ll>3?ll-ba:ll<1?ll+5:ll>2?ll+1:ll>1?ll+2:ll+3}%)\" onclick=\"event.preventDefault(); event.stopPropagation()">`)
.replace(/π√/, '')

;
/////★★★↑↑
