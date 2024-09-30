const gioco = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen', 'twenty', 'twenty-one', 'twenty-two', 'twenty-three', 'twenty-four', 'twenty-five', 'twenty-six', 'twenty-seven', 'twenty-eight', 'twenty-nine', 'thirty', 'thirty-one', 'thirty-two', 'thirty-three', 'thirty-four', 'thirty-five', 'thirty-six', 'thirty-seven', 'thirty-eight', 'thirty-nine', 'forty', 'forty-one', 'forty-two', 'forty-three', 'forty-four', 'forty-five', 'forty-six', 'forty-seven', 'forty-eight', 'forty-nine', 'fifty', 'fifty-one', 'fifty-two', 'fifty-three', 'fifty-four', 'fifty-five', 'fifty-six', 'fifty-seven', 'fifty-eight', 'fifty-nine', 'sixty', 'sixty-one', 'sixty-two', 'sixty-three', 'sixty-four', 'sixty-five', 'sixty-six', 'sixty-seven', 'sixty-eight', 'sixty-nine', 'seventy', 'seventy-one', 'seventy-two', 'seventy-three', 'seventy-four', 'seventy-five', 'seventy-six', 'seventy-seven', 'seventy-eight', 'seventy-nine', 'eighty', 'eighty-one', 'eighty-two', 'eighty-three', 'eighty-four', 'eighty-five', 'eighty-six', 'eighty-seven', 'eighty-eight', 'eighty-nine', 'ninety', 'ninety-one', 'ninety-two', 'ninety-three', 'ninety-four', 'ninety-five', 'ninety-six', 'ninety-seven', 'ninety-eight', 'ninety-nine', 'a hundred'];



/////↓↓↓↓↓feet→meters
chapter = document.querySelector('#LNReader-chapter');
chapter.innerHTML = chapter.innerHTML
.replace(/\b(square )?feet\b/g, (_, i) => `™™™feet${i?'²':''}`)
.replace(/,(?=\d\d\d(?:\,|\d\d\d)* ™™™feet)/g, '')
.replace(/™™™feet²? (?=tall|thick|long|wide|lower|radius|distance|away|from|in (?:length|height|diameter)|(?:deep|high)(?! in(to)?\b))/g, '⋮⋮⋮feet ')
.replace(/™™™(?<=(?:(?:height|altitude|length|width|wingspan|range) of (?:almost|over|about)? ?|as long as )(?=[otfsen\d])(?:[a-z\d]+|[a-z]+\s[a-z]+) ™+)feet/g, '⋮⋮⋮feet')
.replace(/⋮⋮⋮feet(?<=\b((?<![efhnrx]ty-)(?:two|three|four|five|six|seven|eight|nine)|(?:twen|thir|for|fif|six|seven|eigh|nine)ty(?:\-(?:one|two|three|four|five|six|seven|eight|nine))?|(?:thir|four|fif|six|seven|eigh|nine)teen|ten|eleven|twelve|\d+(?:\.\d+)?|(?:a|one)(?! [a⋮]))( and a half| (hundred|thousand))? ⋮⋮⋮feet)(²)?/g, (_, a,b,c,d) => {
	const multip = {hundred: 100, thousand: 1000}[c] || 1;
	let fff = 0.305;
	if(d) fff = fff * fff;
	let nnn = +gioco.indexOf(a) * fff * multip;
	if(/\d/.test(a)) nnn =  +a * fff * multip;
	if(c) nnn = Math.abs(nnn); //negativ if "a hundred feet tall"
	if(b === " and a half") nnn = nnn + (0.5 * fff);
	if(nnn) nnn = nnn.toFixed(2);
	if(nnn > 11) nnn = Math.round(nnn);
	return `⋮⋮⋮feet${d||''} (${nnn}m${d||''})`})

.replace(/⋮⋮⋮(feet²?) (\(\d+(?:\.\d+)?m\)) ((?:in )?[a-z]+)/g, '$1 $3 $2')
.replace(/(?:⋮⋮⋮|™™™)feet(²)?/g, (_, a) => a ? 'square feet' : 'feet')

.replace(/(\d)\'(?<=\s\d\')(\d)\"/g, (_, a,b) => {
	let feeinc = (+a * 0.305) + (+b * 0.0254);
	if(feeinc) feeinc = feeinc.toFixed(2);
	return ` ${feeinc}m`})
    

//not work strings: ||a long body of over a hundred feet||six to eight feet tall||the horn grows by ten feet||
//jsfidle: https://jsfiddle.net/wjmekrL7/2/
//////↑↑↑↑↑ — END
