/////★★★↓↓ Chapter-titles-hider
spoooiler = document.querySelector(".next-button");
if(spoooiler) {spoooiler.innerText = "———Next Chapter———"}

chapter = document.querySelector('#LNReader-chapter');
chapter.innerHTML = chapter.innerHTML
//preparatory
.replace(/&nbsp;/g, ' ')//
.replace(/<title>[^<]*<\/title>/, '')//epubs
.replace(/^(?:(?=<)[^\?\.,A-Z”“]*?<\/?div\b[^>]*>\s*)+/, '')
.replace(/(<\/?(?:p|h[1-9]|div|span(?!>\s+<i>))>)\s+/g, '$1')//
.replace(/\s+(?=<\/?(?:p|h[1-9]|div|(?<=<\/)span)>)/g, '')//
.replace(/<p><\/p>/g, '')//
.replace(/^[\s\n]*|$/g, '<p></p>')//
//
.replace(/<\/h([1-4])><\/?h\1>/ , ' ')
.replace(/^((?:<p><\/p>|<(?!(?:p|h[1-4])>)[^>]*>)?[^<]*(?:<input[^>]+>)?(?:\s*<[^>]+>\s*<\/[^>]+>)*)/, '$1π√')
.replace(/π√<(h[1-4]|p)>(?:<(?:span|strong|b)>)?(([^C]?Chapter\W+)?(\d{1,4}\b)(\W+(?=\w))?(.+?))(<\/\1>)((?=(.*?<p>))\9((?:\3|\4|\5|\6)(?:\4(?<=\3\4))?\5?\6?\.?)<\/p>)?/i, (_0,_1,_2,_3,_4,_5,_6,_7,_8,_9,_10) => {
	if(_8 === undefined)
		return `⸙<${_1}><spo>${_2}${_7}⸙`;
	else
		return `⸙<${_1}><spo>${_2}${_7}${_9}<spo>${_10}⸙`})
.replace(/⸙([^⸙]+)⸙/, (_, a) => `${a.replace(/<(h[1-4]|p)>([^]+?)<\/\1>/, '<h1>$2</h1>')}`)
.replace(/π√(<(p|h[1-5])>)([^]+?)(?=<\/\2>)/, (_, a,b,c)=> {
	const bas = c.replace(/(?:<\/?[a-z]+>|\.$)/g, '')
	let dare = reader.chapter.name.includes(bas);
	if(dare) return `${a}<spo>${reader.chapter.name}</spo>`;
	else return `${_}`})
.replace(/π√/, '')
;
