const gioco = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen', 'twenty', 'twenty-one', 'twenty-two', 'twenty-three', 'twenty-four', 'twenty-five', 'twenty-six', 'twenty-seven', 'twenty-eight', 'twenty-nine', 'thirty', 'thirty-one', 'thirty-two', 'thirty-three', 'thirty-four', 'thirty-five', 'thirty-six', 'thirty-seven', 'thirty-eight', 'thirty-nine', 'forty', 'forty-one', 'forty-two', 'forty-three', 'forty-four', 'forty-five', 'forty-six', 'forty-seven', 'forty-eight', 'forty-nine', 'fifty', 'fifty-one', 'fifty-two', 'fifty-three', 'fifty-four', 'fifty-five', 'fifty-six', 'fifty-seven', 'fifty-eight', 'fifty-nine', 'sixty', 'sixty-one', 'sixty-two', 'sixty-three', 'sixty-four', 'sixty-five', 'sixty-six', 'sixty-seven', 'sixty-eight', 'sixty-nine', 'seventy', 'seventy-one', 'seventy-two', 'seventy-three', 'seventy-four', 'seventy-five', 'seventy-six', 'seventy-seven', 'seventy-eight', 'seventy-nine', 'eighty', 'eighty-one', 'eighty-two', 'eighty-three', 'eighty-four', 'eighty-five', 'eighty-six', 'eighty-seven', 'eighty-eight', 'eighty-nine', 'ninety', 'ninety-one', 'ninety-two', 'ninety-three', 'ninety-four', 'ninety-five', 'ninety-six', 'ninety-seven', 'ninety-eight', 'ninety-nine', 'a hundred'];



/////↓↓↓↓↓feet→meters
chapter = document.querySelector('#LNReader-chapter');
chapter.innerHTML = chapter.innerHTML
.replace(/,(?=\d\d\d(?:\,|\d\d\d)* feet)/g, '')
.replace(/\bfeet\b/g, '™™™feet')
.replace(/™™™feet (?=tall|thick|long|wide|lower|radius|distance|away|from|in (?:length|height|diameter)|(?:deep|high)(?! in(to)?\b))/g, '⋮⋮⋮feet ')
.replace(/™™™(?<=(?:(?:height|altitude|length|width|wingspan|range) of (?:almost|over|about)? ?|as long as )(?=[aefnost\d])(?:[a-z\d]+|[a-z]+\s[a-z]+) ™™™)feet\b/g, '⋮⋮⋮feet')
.replace(/⋮⋮⋮feet\b(?<=(?<!\-)(?:(?:twen(?=ty)|thir|fou?r|fif|six|seven|eigh|nine)(?:teen|ty)(?:(?<=ty)\-(?:one|two|three|four|five|six|seven|eight|nine))?|(?:two|three|four|five|six|seven|eight|nine|ten|eleven|twelve))\b ⋮⋮⋮feet)/g, '⋮⋮⋮ↂfeet')
.replace(/⋮⋮⋮ↂ?feet\b(?<=(?<!\-)([A-Za-z\-]+\b|\d+(?:\.\d+)?)( and a half| (hundred|thousand))? ⋮⋮⋮ↂ?feet)/g, (_, a,b,c) => {
	let multip = 1;
	if(c === "hundred") multip = 100;
	if(c === "thousand") multip = 1000;
	let fff = 0.305;
	let unRounded = 4 / fff;
	let nnn = +gioco.indexOf(a) * fff * multip;
	if(/\d/.test(a)) nnn =  +a * fff * multip;
	if(c) {nnn = nnn * -1; a = a + b;}
	if(b === " and a half") nnn = nnn + (0.5 * fff);
	if(nnn) nnn = nnn.toFixed(2);
	if(nnn > unRounded) nnn = Math.round(nnn);
	return `${a} ⋮⋮⋮feet (${nnn}m)`})

.replace(/⋮⋮⋮feet (\(\d+(?:\.\d+)?m\)) (tall|tall|thick|long|wide|away|deep|in (?:length|height)|distance)/g, 'feet $2 $1')
.replace(/(?:⋮⋮⋮|™™™)feet/g, 'feet')

.replace(/(\d)\'(?<=\s\d\')(\d)\"/g, (_, a,b) => {
	let feeinc = (+a * 0.305) + (+b * 0.0254);
	if(feeinc) feeinc = feeinc.toFixed(2);
	return ` ${feeinc}m`})
    

//not work strings: ||a long body of over a hundred feet||six to eight feet tall||the horn grows by ten feet||
//////↑↑↑↑↑ — END
