/////★★★↓↓ Chapter-titles-hider
spoooiler = document.querySelector(".next-button");
if(spoooiler) {spoooiler.innerText = "———Next Chapter———"}

const rHsl=(r,g,b)=>{r*=0.00392,g*=0.00392,b*=0.00392;let h,s,M=Math.max(r,g,b),m=Math.min(r,g,b),l=M+m,d=M-m;return 0===d?h=s=0:(s=l<1?d/l:d/(2-l),M===r?h=(g-b)/d+(g<b?6:0):M===g?h=(b-r)/d+2:M===b&&(h=(r-g)/d+4)),[60*h,100*s,50*l]}

let [r,g,b]= document.body.computedStyleMap().get("background-color").toString().match(/[\d\.]+/g);
let [hh,ss,ll]= rHsl(r,g,b);

chapter = document.querySelector('#LNReader-chapter');
chapter.innerHTML = chapter.innerHTML
//preparatory
.replace(/(<h[1-8]) [^>]+>/g, '$1>')
.replace(/&nbsp;/g, ' ')//
.replace(/<title>[^<]*<\/title>/, '')//epubs
.replace(/^(?:(?=<)[^\?\.,A-Z”“]*?<\/?div\b[^>]*>\s*)+/, '')
.replace(/(<\/?(?:p|h[1-9]|div|span(?!>\s+<i>))>)\s+/g, '$1')//
.replace(/\s+(?=<\/?(?:p|h[1-9]|div|(?<=\/)span)>)/g, '')//
.replace(/<p><\/p>/g, '')//
.replace(/^\s*|$/g, '<p></p>')//
//
.replace(/<\/h([1-4])><\/?h\1>/ , ' ')
.replace(/^((?:<p><\/p>|<(?!p>|h[1-4]>)[^>]*>)?[^<]*(?:<input[^>]+>)?(?:\s*<[^>]+>\s*<\/[^>]+>)*)/, '$1π√')//keep $1
.replace(/π√<(h[1-4]|p|span)>(?:<(?:span|strong|b)>)?(([^C]?Chapter\W+)?(\d{1,4}\b(?:\.\d)?)(\W+\b)?([^]+?))(<\/(?:\1(?<!n)|span)>(?=<(?:br|p)>))((?=([^]*?<p>))\9((?:\3|\4|\5|\6)(?:\4(?<=\3\4))?\5?\6?\.?)<\/p>)?/i, (_0,_1,_2,_3,_4,_5,_6,_7,_8,_9,_10) => {
  const gu2 = _2.replace(/<\/\w+>/g, '');
	if(_8 === undefined)
		return `⸙<${_1}>~~<spo>${gu2}</spo>${_7}⸙`;
	else
		return `⸙<${_1}>~~<spo>${gu2}${_7}${_9}~~<spo>${_10}⸙`})
.replace(/⸙([^⸙]+)⸙/, (_, a) => `${a.replace(/<(h[1-4]|p)>([^]+?)<\/\1>/, '<h1>$2</h1>')}`)
.replace(/π√<(p|h[1-5])>([^]+?)<\/\1>/, (_, a,b)=> {
	const bas = b.replace(/(?:<\/?[a-z]+>|\.$)/g, '')
	let dare = reader.chapter.name.includes(bas);
	if(dare) return `<h1>~~<spo>${reader.chapter.name}<\/spo></h1>`;
	else return _})
.replace(/~~<spo>/g, S => `<spo style="background: hsl(${hh}, ${ss}%, ${ll>3?ll-2:ll<1?ll+5:ll>2?ll+1:ll>1?ll+2:ll+3}%)\" onclick=\"event.preventDefault(); event.stopPropagation()">`)
.replace(/π√/, '')

;
/////★★★↑↑
