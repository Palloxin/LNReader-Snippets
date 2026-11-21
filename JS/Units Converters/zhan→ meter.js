const taco = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen', 'twenty', 'twenty-one', 'twenty-two', 'twenty-three', 'twenty-four', 'twenty-five', 'twenty-six', 'twenty-seven', 'twenty-eight', 'twenty-nine', 'thirty', 'thirty-one', 'thirty-two', 'thirty-three', 'thirty-four', 'thirty-five', 'thirty-six', 'thirty-seven', 'thirty-eight', 'thirty-nine', 'forty', 'forty-one', 'forty-two', 'forty-three', 'forty-four', 'forty-five', 'forty-six', 'forty-seven', 'forty-eight', 'forty-nine', 'fifty', 'fifty-one', 'fifty-two', 'fifty-three', 'fifty-four', 'fifty-five', 'fifty-six', 'fifty-seven', 'fifty-eight', 'fifty-nine', 'sixty', 'sixty-one', 'sixty-two', 'sixty-three', 'sixty-four', 'sixty-five', 'sixty-six', 'sixty-seven', 'sixty-eight', 'sixty-nine', 'seventy', 'seventy-one', 'seventy-two', 'seventy-three', 'seventy-four', 'seventy-five', 'seventy-six', 'seventy-seven', 'seventy-eight', 'seventy-nine', 'eighty', 'eighty-one', 'eighty-two', 'eighty-three', 'eighty-four', 'eighty-five', 'eighty-six', 'eighty-seven', 'eighty-eight', 'eighty-nine', 'ninety', 'ninety-one', 'ninety-two', 'ninety-three', 'ninety-four', 'ninety-five', 'ninety-six', 'ninety-seven', 'ninety-eight', 'ninety-nine', 'a hundred'];




////↓↓↓ zhang → meters
chapter.innerHTML = chapter.innerHTML
.replace(/\bzhang\b/g, '⋮⋮⋮zhang')
.replace(/⋮⋮⋮zhang(?<=\b((?:twen|thir|for|fif|six|seven|eigh|nine)ty(?:-(?:one|two|three|four|five|six|seven|eight|nine))?|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|(?:thir|four|fif|six|seven|eigh|nine)teen|\d+(?:\.\d+)?|(?:a|one)(?! [a⋮]))( and a half| (hundred|thousand))?[ \-]⋮⋮⋮zhang)(²)?/gi, (_, a,b,c,d) => {
	const mi = {hundred:100, thousand:1000}[c] || 1;
    const u = "zhang"; //unit
	let ff = 3.58; //1 unit => meters
	if(d) ff = ff **2;
	let nnn = /\d/.test(a) ? +a*ff*mi : +taco.indexOf(a.toLowerCase())*ff*mi;
	if(c) nnn = Math.abs(nnn); //negativ if "a hundred feet tall"
	if(b === " and a half") nnn += 0.5 * ff;
	if(nnn) nnn = nnn.toFixed(2);
	if(nnn > 11) nnn = Math.round(nnn);
	return `⋮⋮⋮${u}${d||''}÷×(${nnn}m${d||''})`})

.replace(/⋮⋮⋮(zhang)÷×(\([\d.]+m\))([\s\-]-?(?:tall|thick|long|wide|height|lower|radius|distance|away|from|in (?:length|height|diameter)|(?:deep|high)(?! in(?:to)?\b)|of distance|farther down)\b)/g, '$1$3 $2')
.replace(/√√((?:in |of (?=distance))?[a-z]+(?:-\w+)?)/g, '$2$3 $1') //move conv forward
.replace(/÷×/g, '')
.replace(/(?:⋮⋮⋮|™™™)zhang(²)?(([ \-])√√)?/g, (_, a,b,c) => `${a?'square ':''}zhang${b?c:''}`)

//remember to delete the "taco" constant if you stacked more unit-snippets. Just keep one in the code.
////↑↑↑ — END
