/////↓↓↓↓↓↓↓↓↓↓ 12h→24h time format
chapter = document.querySelector('chapter');
chapter.innerHTML = chapter.innerHTML
//↓ the . of ``a/pm.`` ends a phrase and continues
.replace(/\b(?<!\:|\d-)((?:[1-9]|10|11|12|\d\d?:\d\d) ?[ap])\.?m(\.[^\.]|\b)/gi, (_, a,b)=> `•••${a.toLowerCase()}m.${b}`)//♦
//↓ cases like 3-4 pm
.replace(/\b(?<!\:)([1-9]|10|11)-([1-9]|10|11|12)\s*([ap]\.?m\b)/gi, '•••$1 $3°°-°°•••$2 $3.')
//↓ \d AM/PM indicates a different acronym
.replace(/•••(?<=\bwith •••)(\d+ [ap])\.?m(?:\.(?!\.)|\b)/g, (_, a) => `${a.toUpperCase()}M`)
//↓ exception
.replace(/•••12(:\d\d)?\s*([ap])m(\.|\b)/g, (_, z,i)=>{
let gag = z;
if (z === undefined) gag = ":00";
if(i ==="a") return `00${gag}`; 
else return `12${gag}`;
})

.replace(/•••(\d+)\s*(?::\s*(\d\d))?\s*([ap])m(?:\.|\b)/g, (_, a,b,cc)=>{
    const h = +a;
    const m = +b || 0;
    if(cc === "a")
      return `•••${h}:${`${m}`.padStart(2,"0")}`;
    else
      return `•••${(h+12)%24}:${`${m}`.padStart(2,"0")}`;
})

.replace(/\b([2-9]|10|11) (o’clock at night|in the (?:evening|afternoon))\b/g, (_, a,b)=> `${Math.round(+a + 12)}:00 ${b.replace(/o’clock /, '')}`)
.replace(/(\:\d\d|\b[AP]M)\.([\.\,])/g, '$1$2')
.replace(/°°\-°°/g, '-')//sixth spaces
.replace(/•••(?=\d)/g, '')
;
/////↑↑↑↑↑↑↑↑↑↑ – END