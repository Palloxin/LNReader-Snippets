let imgs = [];
chapter = document.querySelector('#LNReader-chapter');
chapter.innerHTML = chapter.innerHTML

//store images
.replace(/=(?<=src=)\"[^\"]+\"[^>]*(?=>)/g, Y => {
imgs.push(Y); return "䷢䷢䷢"+imgs.length;})
//↓ — 0 || performance anchors (symbol=♦)
.replace(/(^[^<]*(?:<input[^>]+>)?)[\s\n]*/, '$1♪')//♦start-chapter
//↓↓— 1
.replace(/[\u200b]/g, '')//zero-width space
.replace(/\n+/g, '')
.replace(/<title>[^<]*<\/title>/, '')//EPUBs
.replace(/&nbsp;/g, '\u00a0')//to include it with \s
.replace(/\s+(?:(?=[’‘\'"”“]?<\/?(?:p|h[1-9]|div)[> ])|((?:<\/(?:[abi]|em|span|strong)>\s*)+))/g, (_, a) => a?`${a.replace(/\s/g, '')} `:'')//move out outer spaces
.replace(/<(em|span|[abip]|div)\b[^>]*>\s*<\/\1>/g, '')
.replace(/=\"(?=[ >])/g, '=\"\"')//weird case
//↑↑
///↓↓↓↓↓— 2
.replace(/<p [^>]+>/g, '<p>')
.replace(/(<\/?(?:p|h[1-9]|div)>)\s+/g, '$1')
//↓
.replace(/(?:<span>(?:[^<]*<(?!(?:span|\/?p)>))+\/span>[^<]*(?:<(?!\/?(?:p|span)>)[^>]+>[^<]*)*){2,}/g, _ => `${_.replace(/<\/span>(.*?)<span>/g, '$1')}`)//span clog - https://jsbench.me/w0m9jpmj80
//↑
.replace(/<br>\s*(?=<\/?p>)/g, '')
///↑↑↑↑↑
//↓↓↓ —
.replace(/<p><\/p>/g, '')//excessive <p>
.replace(/^[\s\n]*|$/g, '<p></p>')
.replace(/<(?:\/?div(?: id)?|input type|\/?a(?=[ >]))\b[^>]+>/g, '')
.replace(/(<h[1-4]>)<span>([^]+?)<\/span>/, '$1$2')
//↑↑↑

.replace(/(?:<br>\s*)+(?=<br>\s*<br>)/g, '')
.replace(/(?:<br><\/?br>)+(?=<)/g, '')
//↓↓↓↓↓ — masked letters
.replace(/[асᴄԁеһіјӏոоοօᴏрԛѕꜱսνᴠԝᴡхⅹуᴢАВСЕНІЈKМΝОРԚЅТԜХ]/g, aa => {
	const fakers = {
		а: 'a', с: 'c', ᴄ: 'c', ԁ: 'd', е: 'e', һ: 'h', і: 'i', ј: 'j', ӏ: 'l',
		ո: 'n', о: 'o', ο: 'o', օ: 'o', ᴏ: 'o', р: 'p', ԛ: 'q', ѕ: 's', ꜱ: 's',
		ս: 'u', ν: 'v', ᴠ: 'v', ᴡ: 'w', ԝ: 'w', х: 'x', ⅹ: 'x', у: 'y', ᴢ: 'ᴢ',
		А: 'A', В: 'B', С: 'C', Е: 'E', Н: 'H', І: 'I', Ј: 'J', K: 'K', Ν: 'N',
		М: 'M', О: 'O', Р: 'P', Ԛ: 'Q', Ѕ: 'S', Т: 'T', Ԝ: 'W', Х: 'X'};
	return fakers[aa]})
//↑↑↑↑↑
//↓ — 2 disabled js
//%&&&&replace(/\.[a-z](?<=[a-zA-Z]\.[a-z])(?:\.[a-z])+(?!\.[A-Z])/g, M => `${M.replace(/\./g, '')}`)//input: ``s.p.a.c.e.s.h.i.p`` —> output: ``spaceship``
//↑
//↓↓↓↓↓— 3
.replace(/(\d) ?(k?m)([2-3])\b/g, '$1$2‡$3★')
//↑↑↑↑↑
//↓↓↓—
.replace(/<sup>(\d)<\/sup>(?:\s+(?!\w))?/g, '‡$1★')
.replace(/‡(\d)★/g, (_, a) => {
	const hdigg = ['⁰', '¹', '²', '³', '⁴', '⁵', '⁶', '⁷', '⁸', '⁹'];
	return hdigg[+a]})
//↑↑↑
///↓↓↓↓↓— three dots
.replace(/\. ?…|…\.\.(?!\.)/g, '….')
.replace(/(?:\s?\.\.\.|\s…\s*|(?:\s(?<!\..))?\. \. \.(?! \.) ?)/g, '…')
.replace(/\.\.\b/g, '‥')
.replace(/…(?<=(?:\w|[a-z][’\'\"\”])…)…?\.?(?=[A-Z]|[a-z])/g, '…⅞⅘ ')//thin space
.replace(/⅞⅘\s(?=[TYVW])/g, ' ').replace(/⅞⅘/g, '')
.replace(/…(?<=\W[\"\"‘“].)\s/g, '…')
.replace(/…(?<![\w\'\"”’\]\?]…)…?\s(?=\w)/g, '…')
.replace(/…(?<=[^’\'](\b\w+)…)\s\1\B/gi, '…$1')//Bo…Bobby!!
//↓exceptions
.replace(/…(?=(?:Some|Not)\b(?<=So…Some|No…Not))/g, '… ')
//↑
.replace(/…(?<=\b(\w+)…)…?\s\1\b/g, '… $1')//sixth space
.replace(/…(?<![\s\w\…\"“‘\'”’\>\%\]\?]…)…?(?![\<\'\"’”\|\?])/g, ' …')
.replace(/…\.(?<=[\s“]…\.)\s/g, '…')
.replace(/…(?=[AJ])/g, '…\u200a\u2060')//hair-s + u2060
.replace(/…([a-zA-Z][a-zA-Z\s]{1,20})…/g, '‥$1…')
.replace(/…I(?<=\bI…I)(?= ?[A-Za-z])/g, '-I')
.replace(/…(?=[\u200a\w])/g, '…\u2060')
///↑↑↑↑↑ — https://jsfiddle.net/f32r74q1/1/
//↓↓↓↓— 
.replace(/\.(?=\d\d)(?<=\s\.)/g, '✓+®.')//★↓
.replace(/®(?=\.\d+%)/g, '®0')//↓
.replace(/\s(?=[\.\,\]\)\;]+|:(?!\)))(?<=[\w\]].)/g, '')//↑↓
.replace(/✓\+®/g, '')//★↑
.replace(/([\,\:]|\.(?<!…\.)|[\!\?]+)(?<=[a-z\…]\1)(?=[A-Z]|\d(?<=,\d))/g, '$1 ')
.replace(/\/watch\? (?=\w)/g, '/watch?')//yt links
.replace(/(“\w+)\.”\./g, '$1”.')
.replace(/<\/?(?:p|div|h[1-9r]|br>\s*<br)(?:>| [^>]+>)/g, '𛖠$&')//\u1b5a0
.replace(/([\"“”])(?<!\=\")(?!>|\s[\"“”])([^\"“”𛖠]+)([\"”])(?<!=\")/g, '→→$1$2$3←←').replace(/𛖠/g, '')
.replace(/\,([\"”]←←(?!(?:.(?!\/p>|[\"”“][^a-z]))*?[\"”“][a-z])(?:<\/(?:strong|em|span|[bai])>)*|[\'\]’](?=\W))/g, '$1,')//regex101.com/r/ni3BdT/14
.replace(/←←|→→/g, '')
.replace(/,(?:,[, ]*|(?!(?:<\/[a-z]+>)?[\s\d\”\"\’;])(?<=\D\,))/g, ', ')
//↑↑↑↑
//↓↓↓  — apostrophe ( ' => ’ )
.replace(/\'(?<=[A-Za-z]\')(?=[A-Za-z])/g, '’')
.replace(/\'(?<![\w=]\')([^><]+?)\'(?![^\'<]+\')/g, (_, a) => {
    let t = /\'(?<!(?:[\s\W]|[^Ss]).)/g;
    return `'${t.test(a)?a.replace(t, '’').replace(/’(?<=\'[^\'’]+’)(?=[^\']+$)/, '\''):a}'`})
.replace(/\'(?<!\<\/?p>.)(?!<\/?p>)(?<=<p>[^\']+?\')(?=[^\w\'][^\']+?<\/p>)/g, '’')//<p>[^\']+?
// - https://jsfiddle.net/6wf8bnxr/
//↑↑↑ - https://jsfiddle.net/69zbg81a/1/
//↓
.replace(/[”“](?=(?:[dmst]|ll|ve)\b(?!-))(?<=\w)/g, '’')
.replace(/‘((?:[Ii]t|[Yy]ou|[Ss]?[Hh]e|[Ww]e|[Tt]hey)(?=’[lv])|(?:If )?I)’(ll|ve|m)\b/g, (l, j,i) => `‘${j} ${{'m':'am','ll':'will'}[i]||'have'}`)
//↑
	
//↓↓↓↓quotation marks => DOUBLE PRIME 
.replace(/“(?<=\bthe “)([\s\-\w’]+)([\!])?”/g, '″$1″$2')
.replace(/[”“\"](?<=\w .)(\w+|[\?\!])[”\"]/g, '″$1″')
.replace(/“(?<=\w “)(\w+\s\w+)”(?= [a-z])/g, '″$1″')
.replace(/“(?<=[a-z] “)([a-z]+\s[a-z]+)”(?= [A-Za-z])/g, '″$1″')
.replace(/(“\S[^\"”“<]+\s)“([\s\w’]+)”(?=\W[^\"”“<]*?”)/g, '$1″$2″')
.replace(/[“\"](?<=[a-z] [“\"])([a-z\s’]+(?<!’))[”\"]/g, '″$1″')
.replace(/\"(?<=\b(?:or|as?|the|to) \")([A-Za-z’\s]+)\"/g, '″$1″')
//<p>The “ab bb” is fake.</p>
//“I saw the “Ack Bac aa”, it's great
//Go in "place" and...
//DOESNT WORK //<p>"It is so", Aina said, "he did say: "I didnt do it." to me."</p>
//Anastasia sneered; "Weren’t you busy "Crafting"?"
///↑↑↑↑
////↓↓↓↓↓ — 
.replace(/(?:‘|’(?<=[^\.,\?!…]’)(?![a-z]*\s))([^\"”“\'’‘\<]+)(?:(?<!\s)‘|’(?![a-z]))/g, '‘$1’')//test-strings: ``Can’t u do the ’job’?``|||``‘He said ‘something’!’``|||``‘We don’t!’ They said on the Merfolk Pirates’ deck.``|||
.replace(/”(?=\w)(?<![\s\>\,]”)/g, '” ')
.replace(/““[^“”\"]+””/g, '×÷×$&')
.replace(/”(?<=(?:<p>|, |”|\: ?|\. |–|[^>]“[^”–—]+[–—])”)/g, '“')
.replace(/[“‘](?=(?:<\/[^>]+>\s*)*<\/p>)/g, a => a==='“'?'”':'’')
.replace(/’(?<=(?:<p>|, )’)/g, '‘')
.replace(/’(?=\w\w\w+)(?<![\s\w]’)/g, '’ ')
//.replace(/(?: ([\”’])|([\“‘]) )/g, '$1$2')
.replace(/([\?\!\.\…]+)(?<=\w\1)(?=[\"”“][\"”“](?<!\"\")\w)/g, '$1∆∆')
.replace(/∆∆[\"”“][\"”“]/g, '” “')
.replace(/[\"”“][\"”“](?<!\"\"|”“)/g, '\"')
.replace(/“(?<![\s\[\『\「\>]“)/g, ' “')
.replace(/(“[^\"”“<>\—\–]+[\—\–]) \“(?=\S)/, '$1” ')
.replace(/×÷×[“”\"]+([^”“\"<]+)[”“\"\s]+/g, '““$1””')
//↓simulation to check the pairs
.replace(/<\/?(?:p|div|h[1-9r]|br>\s*<br)(?:>| [^>]+>)/g, '𛖠$&')//\u1b5a0
.replace(/=\"([^\"]+)\"(?=[> ])/g, '=÷°÷\'$1÷°÷\'')
.replace(/([\"“”](?!\s?[\"“”])[^\"“”𛖠]+[\"”])/g, '∅¢$1∅¢')
.replace(/∅¢[\"“”]\s/g, ' \“')
.replace(/\"∅¢(?=[A-Za-z])/g, '$& ')
.replace(/, \.∅¢\s*/g, '∅¢')
.replace(/÷°÷\'/g, '\"')
.replace(/∅¢/g, '')
.replace(/𛖠/g, '')
//↑
.replace(/”(?=\w)(?<![\>\,]”)/g, '” ')
//test-strings:
//AAAAAAAAAAAA↓↓
//||“With this I’m immune to it,“ Leylin nodded.||
//||<p>“Neela’s smiled, “I’ll serve my king!”</p>||
//||Bob sat down. ”Good!”||
//||<p>“To Victory! “To Victory!” “Long Live Stewart!” “Long Live Stewart!”.</p>||

////↑↑↑↑↑
//↓↓↓↓↓↓↓ excessive space — **don't put `.replace`(ments) that add 2+ spaces consecutively above this line**
.replace(/\s{2,}/g, ' ')
//↑↑↑↑↑↑↑
//↓↓↓ — 
.replace(/([\?\!]+)(?:\.| (?=\!))/g, '$1')
.replace(/ (?!\?\?\?)([\!\?]+)(?<=\w+(?<!a|the|:) \1)\.?/g, '$1')
.replace(/(‘\w+)\.’(?:(?<=\s\1\.’)|(?!<))/g, '$1’.')
.replace(/’ (?<= o’ )/g, '’')
//↑↑↑
//↓↓↓↓↓↓ — italics
.replace(/(<\/?)(em|i)>/g, (_, a,l) => `${a}${l==='i'?'♠':'♠♠'}>`)
.replace(/(♠+)><(♠+)>(?<!\1>)(.+?)<\/\2><\/\1>/g, '♠♠>$3</♠♠>')
.replace(/(?:<(♠+)>(?:[^<]*<(?!(?:\/p|\1)>))+\/\1>(?:[^<]*<(?!(?:\/p|\1))[^>]+>)*){2,}/g, _ => `${_.replace(/<\/♠+>(.*?)<♠+>/g, '$1')}`)//clog
.replace(/(<\/♠+>\s*(?:<[^>]+>)*)([\!\?]+|[\;\.\:\,])/g, '$2$1')
.replace(/(♠+(?<=\/♠+)>(?:<[^>]+>)*)\s+(?!<\/p>)/g, '$1  ')//n+h space > normal space
.replace(/([”\"]\.?(?=<)|<♠+>)([“\"]|<\/♠+>)/g, '$2$1')
.replace(/([“\"])(<♠+>)([^♠\/]+)(<\/♠+>)([”\"])(\s+)?/g, (_, a1,a2,a3,a4,a5,b) => `${a2}${a1}${a3}${a5}${a4}${b?'  ':''}`)
.replace(/[’‘](<♠+>)(?=[^♠<]+?[”’][^\w<]*<\/♠+>)/g, '$1‘')
.replace(/“(<♠+>)(?=[^♠<]+?[”’][^\w<]*<\/♠+>)/g, '$1“')
.replace(/(♠+(?<=[\!\?\;\.\,]<\/♠+)>)\s*(?=[”’\]\"])/g, '$1 ')//hair space
.replace(/♠+(?<=\/♠+)>(?=[\"”’\'])/g, '$& ')
.replace(/♠+>/g, m => m === '♠>'?'i>':'em>')
//↑↑↑↑↑↑
.replace(/:(?![\s\d\/]|<\/p>)(?<=\w\:)/g, ': ')
////↓↓↓↓↓
//’d => had
.replace(/’d\b(?<=\b[A-Za-z]+’d)\s(?=(?:(?:all|al(?:most|ready|so|ways)|barely|clearly|completely|certainly|decisively|definitely|eve[nr]|evidently|easily|forcibly|first|half|instantly|inadvertently|just|(?:actu|accident|addition|basic|essenti|fin|initi|just|natur|origin|person|successf)[au]lly|mostly|never|not|once|only|often|previously|recently|really|still|somehow|slowly|suddenly|totally|then|unfortunately|at least|long since)\s)?([a-z]+ed(?<!(?:e|\b[^])ed)|[bs]een|br?ought|built|began|broken|beaten|chosen|caught|drawn|drunk|dealt|dug|[dg]one|found|felt|flown|forgotten|fought|fallen|freed|fed|gotten|got|given|grown|hidden|held|heard|kept|known|led|left|lent|learnt|lost|made|met|meant|misunderstood|now|paid|sp?ent|spoken|slept|said|stolen|sunk|shown|smelt|sold|str?uck|stood|sought|taken|taught|thought|thrown|told|understood|woken|won|worn)\b)/g, ' had ')
.replace(/’d(?<=\b[A-Za-z]+’d)\s(?=(?:(?:all|al(?:most|ready|so|ways)|barely|clearly|completely|certainly|definitely|eve[nr]|evidently|easily|forcibly|first|half|instantly|inadvertently|just|(?:actu|accident|addition|basic|essenti|fin|initi|natur|origin|person|successf)[au]lly|mostly|never|not|once|only|often|previously|recently|really|still|somehow|slowly|suddenly|totally|then|unfortunately|at least|long since)\s)?(?:had\s))/g, ' had ')
//’s => has
.replace(/’s\b(?<=\b[A-Za-z]+’s)\s(?=(?:(?:all|al(?:most|ready|so|ways)|barely|clearly|completely|certainly|definitely|eve[nr]|evidently|easily|forcibly|first|half|instantly|inadvertently|just|(?:actu|accident|addition|basic|essenti|fin|initi|natur|origin|person|successf)[au]lly|mostly|never|not|once|only|often|previously|recently|really|still|somehow|slowly|suddenly|totally|then|unfortunately|at least|long since)\s)?(?:(?:exist|happen|remain)ed|been|become|began|got|had)\b(?=\s))/g, ' has ')
.replace(/’s\b(?<=\b[A-Za-z]+’s)\s(?=(?:[a-z]+ed(?<!(?:e|\b[^])ed)|[bs]een|br?ought|built|began|broken|beaten|chosen|caught|drawn|drunk|dealt|dug|[dg]one|found|felt|flown|forgotten|fought|fallen|freed|fed|gotten|got|given|grown|hidden|held|heard|kept|known|led|left|lent|learnt|lost|made|met|meant|misunderstood|now|paid|sp?ent|spoken|slept|said|stolen|sunk|shown|smelt|sold|str?uck|stood|sought|taken|taught|thought|thrown|told|understood|woken|won|worn)\s(?:me|them|us|her|him|it)\b)/g, ' has ')
//||has given us – he has invited us||
////↑↑↑↑↑
//↓↓↓ — 
.replace(/([\[\(])\s/g, '$1')
.replace(/[\]\)](?=\w\w)/g, '$& ')
//↑↑↑

.replace(/ça(?<=\bfaça)de/g, 'cade')
.replace(/-(?<=\b[A-Z]\-)(?:Class|Rank|Cup|Shirt|Plan|Grade|Spot)/g, _ => _.toLowerCase())
//↓↓↓↓↓ \w to avoid "A grade" at the start of a phrase. Not applied to the beginning of phrases on purpose, even for B or C grade etc..
//↑↑↑↑↑

.replace(/(?:[\,\?\!]+|\.+(?!(?:com|it|net|jpg|png|html)\b))(?=[A-Za-z])(?<=\b(?!www\.)\w\w+[\,\?\!\.]+)/g, '$& ')
.replace(/—(?<=\w—)(?=\w)/g, ' — ')//sixth spaces
.replace(/\.([Mm])\.,(?<=[AaPp]\.[Mm]\.,)/g, '$1,')//5 a.m.,
.replace(/([\?!\.…][”“’\"])\.<(?<![”“\"‘]\1\.<)/g, '$1<')
.replace(/(![”’\"])(?<=<p>[“‘\"][^”“\"\/]*?!.)\.<\/p>/g, '$1</p>')
//↓↓ — *
.replace(/\*\s?(?![^\w\*]+\*)([^\s”“\*]+) ?\*(?![a-z\.,\?’”!]|<\/p>) ?/g, '*$1* ')
//.replace(/>*(\S[^<”“\"\'‘\*]+?) \*<\//g, '>*$1*</')
.replace(/\* (?:(?<=\>\* )|(?=\*\W))/g, '*')
.replace(/\*(?<=>.)(?:(\S[^\*\<\,\?\"”“’‘]{2,18}?) \*|(\S[^<”“\"\'‘\*]+?) \*(?=<\/))/g, '*$1$2*')
//↑↑
//Test: "* * *! * * *. * * * * *!";
//↓↓↓↓↓
.replace(/<\/p>(?!<p>[a-z])(?<=[^\.][^\W_]<\/p>)/g, '.</p>')//Dot missing at the end of <p>
//↑↑↑↑↑
//↓↓↓ fix missing “ or ” on simple|short paragraphs
.replace(/([\"”“](?<=<p>.)[\w’]+)((?:\s[\w’]+){0,2}?)([\!\?\…\.]*)(?=<\/p>)/g, '$1$2$3”')
.replace(/<p>([\w’]+)((?:\s[\w’]+){0,2}?)(?=[\!\?\…\.]*[\"”“]<\/p>)/g, '<p>“$1$2')
.replace(/<p>([A-Za-z’]+\,?)([a-zA-Z\s’]+)([\.\!\…\?]*)”/g, '<p>“$1$2$3”')
.replace(/“(?<=<p>“)((?:\s?[A-Za-z’]+){1,6}?)([\!\…\?\.]+)(?=<\/p>)/g, '“$1$2”')
//test: ||<p>“Mm, kakaa!" Bob nodded. “Bla bla’s. Blabla…”||
//↑↑↑
//↓ misc
.replace(/\/p>(?=[^<♪]+<)/g, '/p><p>')//give p to tagless
.replace(/-(?<!<[^>]+?-)(?![^<]+?>)(?<=\b\w\w?\w?-)(?=\w)/g, '-⁠')//u2060
.replace(/\.(?<=\b(?:M[sr]s?|etc)\.)(?=[ ,])/g, '<span style="font-size: 0.8em;">.</span>')
//↑
//↓↓↓↓↓↓↓ thousands separator— n ≤9999 excluded—
.replace(/,(?=\d\d\d\D)/g, '±±')
.replace(/±±(?<=\b\d\d?±±)(?=\d\d\d[^±])/g, '')
.replace(/±±(?<=\d±±)/g, '<span style="font-size: 0.8em;">,</span>')
//↑↑↑↑↑↑↑ alternative separators:
//100𝃳000//100༌000//100˙000//100𑀀000//100ॱ000//100ᱸ000//100ʹ000//100՛000
//place images
.replace(/䷢䷢䷢(\d+)/g, (_, a) => imgs[parseInt(a)-1])

.replace(/ /g, '&nbsp;')//u00a0
.replace(/♪/, '')
.replace(/\bLorem ipsum dolor( sit amet consectetuer adipiscing[^]{1,6}?elit)?/g, '🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴')
//↑ — 0

//%%%%%%%%%—My JS 

//%%%%%%%%%
;
