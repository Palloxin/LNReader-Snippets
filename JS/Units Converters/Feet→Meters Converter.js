const gioco = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen', 'twenty', 'twenty-one', 'twenty-two', 'twenty-three', 'twenty-four', 'twenty-five', 'twenty-six', 'twenty-seven', 'twenty-eight', 'twenty-nine', 'thirty', 'thirty-one', 'thirty-two', 'thirty-three', 'thirty-four', 'thirty-five', 'thirty-six', 'thirty-seven', 'thirty-eight', 'thirty-nine', 'forty', 'forty-one', 'forty-two', 'forty-three', 'forty-four', 'forty-five', 'forty-six', 'forty-seven', 'forty-eight', 'forty-nine', 'fifty', 'fifty-one', 'fifty-two', 'fifty-three', 'fifty-four', 'fifty-five', 'fifty-six', 'fifty-seven', 'fifty-eight', 'fifty-nine', 'sixty', 'sixty-one', 'sixty-two', 'sixty-three', 'sixty-four', 'sixty-five', 'sixty-six', 'sixty-seven', 'sixty-eight', 'sixty-nine', 'seventy', 'seventy-one', 'seventy-two', 'seventy-three', 'seventy-four', 'seventy-five', 'seventy-six', 'seventy-seven', 'seventy-eight', 'seventy-nine', 'eighty', 'eighty-one', 'eighty-two', 'eighty-three', 'eighty-four', 'eighty-five', 'eighty-six', 'eighty-seven', 'eighty-eight', 'eighty-nine', 'ninety', 'ninety-one', 'ninety-two', 'ninety-three', 'ninety-four', 'ninety-five', 'ninety-six', 'ninety-seven', 'ninety-eight', 'ninety-nine', 'a hundred'];



/////↓↓↓↓↓feet→meters
chapter = document.querySelector('#LNReader-chapter');
chapter.innerHTML = chapter.innerHTML
.replace(/,(?=\d\d\d(?:\,|\d\d\d)* feet)/g, '')
.replace(/\bfeet\b/g, '™™™feet')
.replace(/™™™feet (?=tall|thick|long|wide|lower|radius|distance|away|from|in (?:length|height|diameter)|(?:deep|high)(?! in(to)?\b))/g, '⋮⋮⋮feet ⳼')
.replace(/™™™(?<=(?:(?:height|altitude|length|width|wingspan|range) of (?:almost|over|about)? ?|as long as )(?=[aefnost\d])(?:[a-z\d]+|[a-z]+\s[a-z]+) ™™™)feet\b/g, '⋮⋮⋮feet')
.replace(/⋮⋮⋮feet\b(?<=\b(?<!-)(?:two|three|five|ten|eleven|twelve)\b|\b(?:twenty|thir|four(?=te|\b)|forty|fif|six|seven|eight?|nine)(?:teen|ty|\b)(?:\-(?<=y-)(?:one|two|three|four|five|six|seven|eight|nine))?\b|\d+(?:\.\d+)?|(?:a|one)(?! a))\b( and a half| (hundred|thousand))? ⋮⋮⋮feet)/g, 'ↂↂfeet')
.replace(/ↂↂfeet\b(?<=\b(?<!\-)([\w\-]+\b(?:\.\d+)?|a)( and a half| (hundred|thousand))? ↂↂfeet)/g, (_, a,b,c) => {
	const multip = {hundred: 100, thousand: 1000}[c] || 1;
	let fff = 0.305;
	let nnn = +gioco.indexOf(a) * fff * multip;
	if(/\d/.test(a)) nnn =  +a * fff * multip;
	if(c) nnn = Math.abs(nnn);//negativ if "a hundred feet tall"
	if(b === " and a half") nnn = nnn + (0.5 * fff);
	if(nnn) nnn = nnn.toFixed(2);
	if(nnn > 11) nnn = Math.round(nnn);
	return `⋮⋮⋮feet (${nnn}m)`})

.replace(/⋮⋮⋮feet (\(\d+(?:\.\d+)?m\)) ⳼(tall|thick|long|wide|away|deep|in (?:length|height)|distance)/g, 'feet $2 $1')
.replace(/(?:⋮⋮⋮|™™™)feet/g, 'feet')

.replace(/(\d)\'(?<=\s\d\')(\d)\"/g, (_, a,b) => {
	let feeinc = (+a * 0.305) + (+b * 0.0254);
	if(feeinc) feeinc = feeinc.toFixed(2);
	return ` ${feeinc}m`})
    

//not work strings: ||a long body of over a hundred feet||six to eight feet tall||the horn grows by ten feet||
//jsfidle: https://jsfiddle.net/mq7y98v1/
//////↑↑↑↑↑ — END
