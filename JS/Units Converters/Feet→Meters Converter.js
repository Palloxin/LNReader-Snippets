const tico = ['zero','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen','twenty','twenty-one','twenty-two','twenty-three','twenty-four','twenty-five','twenty-six','twenty-seven','twenty-eight','twenty-nine','thirty','thirty-one','thirty-two','thirty-three','thirty-four','thirty-five','thirty-six','thirty-seven','thirty-eight','thirty-nine','forty','forty-one','forty-two','forty-three','forty-four','forty-five','forty-six','forty-seven','forty-eight','forty-nine','fifty','fifty-one','fifty-two','fifty-three','fifty-four','fifty-five','fifty-six','fifty-seven','fifty-eight','fifty-nine','sixty','sixty-one','sixty-two','sixty-three','sixty-four','sixty-five','sixty-six','sixty-seven','sixty-eight','sixty-nine','seventy','seventy-one','seventy-two','seventy-three','seventy-four','seventy-five','seventy-six','seventy-seven','seventy-eight','seventy-nine','eighty','eighty-one','eighty-two','eighty-three','eighty-four','eighty-five','eighty-six','eighty-seven','eighty-eight','eighty-nine','ninety','ninety-one','ninety-two','ninety-three','ninety-four','ninety-five','ninety-six','ninety-seven','ninety-eight','ninety-nine','a hundred'];



/////↓↓↓↓↓feet→meters
chapter = document.querySelector('#LNReader-chapter');
chapter.innerHTML = chapter.innerHTML
.replace(/\b(square )?f(ee|oo)t\b/g, (_, i,l) => `™™™f${l==='ee'?'%%':'%'}t${i?'²':''}`)
.replace(/,(?=\d\d\d(?:\,|\d\d\d)* ™™™f%+t)/g, '')
.replace(/™™™f(%+t²?) (?=tall|thick|long|wide|lower|radius|distance|away|from|in (?:length|height|diameter)|(?:deep|high)(?! in(?:to)?\b))/g, '⋮⋮⋮f$1 √√')
.replace(/™™™(?<=(?:(?:height|altitude|length|width|wingspan|range) of (?:almost|over|about|approximately)? ?|as long as | the )(?=[otfsen\d])(?:[a-z\d]+|[a-z]+\s[a-z]+) ™™™)(?=f%+t)/g, '⋮⋮⋮')
.replace(/⋮⋮⋮f(%+)t(?<=\b((?<![efhnrx]ty-)(?:two|three|four|five|six|seven|eight|nine)|(?:twen|thir|for|fif|six|seven|eigh|nine)ty(?:\-(?:one|two|three|four|five|six|seven|eight|nine))?|(?:thir|four|fif|six|seven|eigh|nine)teen|ten|eleven|twelve|\d+(?:\.\d+)?|(?:a|one)(?! [a⋮]))( and a half| (hundred|thousand))? ⋮⋮⋮f%+t)(²)?/g, (_,z, a,b,c,d) => {
	const mi = {hundred:100, thousand:1000}[c] || 1;
	let ff = 0.305;
	if(d) ff = ff **2;
	let nnn = /\d/.test(a) ? +a*ff*mi : +tico.indexOf(a)*ff*mi;
	if(c) nnn = Math.abs(nnn); //negativ if "a hundred feet tall"
	if(b === " and a half") nnn += 0.5 * ff;
	if(nnn) nnn = nnn.toFixed(2);
	if(nnn > 11) nnn = Math.round(nnn);
	return `⋮⋮⋮f${z}t${d||''} ÷×(${nnn}m${d||''})`})

.replace(/÷×(\([\d\.]+m²?\)) √√((?:in )?[a-z]+)/g, '$2 $1')
.replace(/(?:⋮⋮⋮|™™™)f(%+)t(²)?/g, (_,z, a) => `${a?'square ':''}f${z==='%'?'oo':'ee'}t`)

.replace(/(\d)\'(?<=\s\d\')(\d)\"/g, (_, a,b) => {
	let feeinc = (+a * 0.305) + (+b * 0.0254);
	return ` ${feeinc.toFixed(2)}m`})
    

//not work strings: ||a long body of over a hundred feet||six to eight feet tall||the horn grows by ten feet||each had 5 feet of canopy
//jsfidle: https://jsfiddle.net/fsmLg0r9/1/
//////↑↑↑↑↑ — END
