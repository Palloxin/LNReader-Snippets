/////↓↓↓↓↓↓↓↓↓↓ 12h→24h time format
chapter = document.querySelector('#LNReader-chapter');
chapter.innerHTML = chapter.innerHTML
.replace(/\b(?<!:|\d-)(?=(?:[1-9]|1[012]|0\d(?=:\d))(?::[0-5]\d\b)?(?:-| ?[AaPp]\.?[mM](?=\.[^\.]|\b)))/g, '••••')//♦
//↓ the . of ``a/pm.`` ends a phrase and continues
.replace(/••••([\d:\s]+[ap])\.?m\b/gi, (_, a)=> `••••${a.toLowerCase()}m.`)
//↓ cases like 3-4 pm
.replace(/••••((?!12)\d+)-(\d+)\s*([ap]\.?m\b)/gi, '••••$1 $3°°-°°••••$2 $3.')
//↓ \d AM/PM indicates a different acronym
.replace(/••••(?<=\bwith •+)(\d+ [ap])\.?m\b/g, (_, a) => `${a.toUpperCase()}M`)
//↓ exception
.replace(/••••12(:\d+)?\s*([ap])m\b/g, (_, z,i)=>{
let gag = z || ":00";
if(i ==="a") return `00${gag}`;
else return `12${gag}`;
})

.replace(/••••(\d+)(?::(\d\d))?\s*([ap])m(?:\.|\b)/g, (_, a,b,c)=>{
    const h = +a;
    const m = +b || 0;
    if(c === "a")
      return `${h}:${`${m}`.padStart(2,"0")}`;
    else
      return `${(h+12)%24}:${`${m}`.padStart(2,"0")}`;
})

//↓ o’clock
//↓ o’clock
.replace(/’(?<=(\w+) o’)clock\b/g, (_, a) => `’clock${{two:2, three:3, four:4, five: 5, six:6, seven:7, eight:8, nine:9, ten:10, eleven:11}[a.toLowerCase()]||''}`)
.replace(/\b(?:[1-9]|1[01]|[A-Za-z]+) o’clock(\d+)( (?:at|in the)(?<=\D(?:[7-9]|1[01]) (?:at|in the)) (?:night|evening)| in(?<=[1-9] in) the afternoon)?\b/g, (_, a,b)=> `${b ? +a+12 : ''} o’clock${b||''}`)
//↑
.replace(/(:\d\d|\b[AP]M)\.(?=[\.\,])/g, '$1')
.replace(/°°-°°/g, ' - ')//sixth spaces
.replace(/••••(?=\d)/g, '')
;
/////↑↑↑↑↑↑↑↑↑↑ – END
