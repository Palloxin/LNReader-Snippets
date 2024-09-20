/////↓↓↓↓↓↓↓↓↓↓ 12h→24h time format
chapter = document.querySelector('#LNReader-chapter');
chapter.innerHTML = chapter.innerHTML
.replace(/\b(?<!:|\d-)(?=(?:[1-9]|1[012]|0\d(?=:))\b(?::[0-5]\d\b)?(?:-| ?[AaPp]\.?[mM](?=\.[^\.]|\b)))/g, '••••')//♦️
//↓ the . of ``a/pm.`` ends a phrase and continues
.replace(/••••[\d:\s]+[ap])\.?m(?=\.[^\.]|\b)/gi, (_, a)=> `••••${a.toLowerCase()}m.`)
//↓ cases like 3-4 pm
.replace(/••••((?!12)\d+)-(\d+)\s*([ap]\.?m\b)/gi, '••••$1 $3°°-°°••••$2 $3.')
//↓ \d AM/PM indicates a different acronym
.replace(/••••(?<=\bwith ••••)(\d+ [ap])\.?m(?:\.(?!\.)|\b)/g, (_, a) => `${a.toUpperCase()}M`)
//↓ exception
.replace(/••••12(:\d\d)?\s*([ap])m(?:\.|\b)/g, (_, z,i)=>{
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

.replace(/\b([2-9]|10|11) (o’clock at night|in the (?:evening|afternoon))\b/g, (_, a,b)=> `${Math.round(+a + 12)}:00 ${b.replace(/o’clock /, '')}`)
.replace(/(?<=:\d\d|\b[AP]M)\.(?=[\.\,])/g, '')
.replace(/°°\-°°/g, ' - ')//sixth spaces
.replace(/••••(?=\d)/g, '')
;
/////↑↑↑↑↑↑↑↑↑↑ – END
