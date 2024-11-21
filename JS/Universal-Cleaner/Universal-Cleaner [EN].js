let imgs = [];
chapter = document.querySelector('#LNReader-chapter');
chapter.innerHTML = chapter.innerHTML

//store images
.replace(/=(?<=src=)\"[^\"]+\"[^>]*>/g, (y) => {
imgs.push(y); return "䷢䷢䷢"+imgs.length;})
//↓ — 0 || performance anchors (symbol=♦)
.replace(/(^[^<]*(?:<input[^>]+>)?)[\s\n]*/, '$1♪')//♦start-chapter
//↓↓— 1
.replace(/[\u200b]/g, '')//zero-width space
.replace(/\n+/g, '')
.replace(/<title>[^<]*<\/title>/, '')//EPUBs
.replace(/&nbsp;/g, ' ')//no-break-space; To make "&nbsp;" not interferee with other replacements.
.replace(/<(em|span|[abip]|div)\b[^>]*>\s*<\/\1>/g, '')
//↑↑
///↓↓↓↓↓— 2
.replace(/<p [^>]+>/g, '<p>')
.replace(/(<\/?(?:p|h[1-9]|div)>)\s+/g, '$1')
.replace(/\s+(?=<\/?(?:p|h[1-9]|div)>)/g, '')
//↓
.replace(/<\/span><span>/g, '<\/span> <span>')
.replace(/<\/?span>/g, '')
//.replace(/<\/?span>(?:(?=<\/p>)|(?<=<p><span>))/g, '')
//↑
.replace(/<br>\s*(?=<\/?p>)/g, '')
///↑↑↑↑↑
//↓↓↓ —
.replace(/<p><\/p>/g, '')//excessive <p>
.replace(/^[\s\n]*|$/g, '<p></p>')
.replace(/<(?:\/?div(?: id)?|input type|a href)\b[^>]+>/g, '')
.replace(/(<h[1-4]>)<span>([^]+?)<\/span>/, '$1$2')
//↑↑↑

.replace(/(?:<br>\s*)+(?=<br>\s*<br>)/g, '')
.replace(/(?:<br><\/?br>)+(?=<)/g, '')
//↓↓↓↓↓ — masked letters
.replace(/[асᴄԁеһіјӏոоοօᴏрԛѕꜱսνᴠԝᴡхⅹуᴢАВСЕНІЈKМΝОРԚЅТԜХ]/g, (aa) => {
	const fakers = {
		а: 'a', с: 'c', ᴄ: 'c', ԁ: 'd', е: 'e', һ: 'h', і: 'i', ј: 'j', ӏ: 'l',
		ո: 'n', о: 'o', ο: 'o', օ: 'o', ᴏ: 'o', р: 'p', ԛ: 'q', ѕ: 's', ꜱ: 's',
		ս: 'u', ν: 'v', ᴠ: 'v', ᴡ: 'w', ԝ: 'w', х: 'x', ⅹ: 'x', у: 'y', ᴢ: 'ᴢ',
		А: 'A', В: 'B', С: 'C', Е: 'E', Н: 'H', І: 'I', Ј: 'J', K: 'K', Ν: 'N',
		М: 'M', О: 'O', Р: 'P', Ԛ: 'Q', Ѕ: 'S', Т: 'T', Ԝ: 'W', Х: 'X'};
	return fakers[aa]})
//↑↑↑↑↑
//↓ — 2 disabled js
//%&&&&replace(/\.[a-z](?<=[a-zA-Z]\.[a-z])(?:\.[a-z])+/g, (_) => `${_.replace(/\./g, '')}`)//input: ``s.p.a.c.e.s.h.i.p`` —> output: ``spaceship``
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
.replace(/(?:\. ?…|…\.\.)/g, '….')
.replace(/\s?(?:\.\.\.|… ?|(?<!\. )\. \. \.(?! \.) ?)/g, '…')
.replace(/…(?<=\w…)…?\.?(?=\w)/g, '…⅞⅘ ')//thin space
.replace(/⅞⅘\s(?=[TYVW])/g, ' ').replace(/⅞⅘/g, '')
.replace(/…(?<!\w…)…?\s(?=\w)/g, '…')
.replace(/…(?<=[^’](\b\w+)…)\s\1\B/gi, '…$1')//Bo…Bobby!!
//↓exceptions
.replace(/…(?=(?:Some|Not)\b(?<=So…Some|No…Not))/g, '… ')
//↑
.replace(/…(?<=\b(\w+)…)…?\s\1\b/g, '… $1')//sixth space
.replace(/…(?<=[^\s\w\…\"“‘\'\>\%]…)…?(?![\<\'\"’”\|\?])/g, ' …')
.replace(/…\.(?<=[\s“]…\.)\s/g, '…')
.replace(/…(?=[AJ])/g, '…\u200a\u2060')//hair-s + u2060
.replace(/…([a-zA-Z][a-zA-Z\s]{1,20})…/g, '‥$1…')
.replace(/…I(?<=\bI…I)(?= ?[A-Za-z])/g, '-I')
.replace(/…(?=[\u200a\w])/g, '…\u2060')
///↑↑↑↑↑
//↓↓↓↓— 
.replace(/\.(?=\d\d+)(?<=\s\.)/g, '✓+®.')//★↓
.replace(/®(?=\.\d+%)/g, '®0')//↓
.replace(/\s(?=[\.\,\]\)\:\;]+)(?<=\w\s)/g, '')//↑↓
.replace(/✓\+®/g, '')//★↑
.replace(/([\.\,\:]|[\!\?]+)(?<=[a-z\…]\1)(?=[A-Z]|\d(?<=,\d))/g, '$1 ')
.replace(/(“\w+)\.”\./g, '$1”.')
.replace(/([\"“”])(?<!\=\")(?!>|\s[\"“”])([^\"“”]+)([\"”])(?<!=\")/g, '→→$1$2$3←←')
.replace(/\,([\"”](?=←←)|[\'\]’](?=\W))/g, '$1,')//comma
.replace(/←←|→→/g, '')
.replace(/,,[, ]*/g, ', ')
.replace(/\,(?![\s\d\”\’;])(?<=\D\,)/g, ', ')
.replace(/\'(?<=[A-Za-z]\')(?=[A-Za-z])/g, '’')
//↑↑↑↑
//↓↓
.replace(/[”“](?=(?:[dmst]|ll|ve)\b(?!-))/g, '’')
.replace(/‘((?:[Ii]t|[Yy]ou|[Ss]?[Hh]e|[Ww]e|[Tt]hey)(?=’[lv])|(?:If )?I)’(ll|ve|m)\b/g, (l, j,i) => `‘${j} ${{'m':'am','ll':'will'}[i]||'have'}`)
//↑↑
	
//↓↓↓↓quotation marks => DOUBLE PRIME 
.replace(/“(?<=\bthe “)([\s\-\w’]+)([\!])?”/g, '″$1″$2')
.replace(/[”“\"](?<=\b\w+ [“”\"])(\w+|[\?\!])[”\"]/g, '″$1″')
.replace(/“(?<=\b\w+ “)(\w+\s\w+)”(?= [a-z])/g, '″$1″')
.replace(/“(?<=\b[a-z]+ “)([a-z]+\s[a-z]+)”(?= [A-Za-z])/g, '″$1″')
.replace(/(“\S[^\"”“<]+\s)“([\s\w’]+)”(?=\W[^\"”“<]*?”)/g, '$1″$2″')
.replace(/[“\"](?<=\b[a-z]+ [“\"])([a-z\s’]+(?<!’))[”\"]/g, '″$1″')
.replace(/\"(?<=\b(?:or|as?|the|to) \")([A-Za-z’\s]+)\"/g, '″$1″')
//<p>The “ab bb” is fake.</p>
//“I saw the “Ack Bac aa”, it's great
//Go in "place" and...
//DOESNT WORK //<p>"It is so", Aina said, "he did say: "I didnt do it." to me."</p>
//Anastasia sneered; "Weren’t you busy "Crafting"?"
///↑↑↑↑
////↓↓↓↓↓ — 
.replace(/(?:‘|’(?<=\W’)(?!s?\s))([^\"”“\'’‘\<]+)(?:(?<!\s)‘|’(?![a-z]))/g, '‘$1’')//test-strings: ``Can’t u do the ’job’?``|||``‘He said ‘something’!’``|||``‘We don’t!’ They said on the Merfolk Pirates’ deck.``|||
.replace(/”(?=\w)(?<=[^\s\>\,]”)/g, '” ')
.replace(/”(?<=(?:<p>|, |”|\: ?|\. |–|[^>]“[^”–—]+[–—])”)/g, '“')
.replace(/[“‘](?=<\/p>)/g, (a) => a === '“' ? '”' : '’' )
.replace(/’(?<=(?:<p>|, )’)/g, '‘')
.replace(/’(?=\w\w\w+)(?<![\s\w]’)/g, '’ ')
.replace(/[\"“](?<=<p>[\"“])[\"”“]/g, '“')
.replace(/([\?\!\.\…]+)(?<=\w+\1)(?=[\"”“][\"”“](?<!\"\")\w)/g, '$1∆∆')
.replace(/∆∆([\"”“])([\"”“])/g, '$1 $2')
.replace(/[\"”“][\"”“](?<!\"\")/g, '\"')
.replace(/“(?<=[^\s\>]“)/g, ' “')
.replace(/(“[^\"”“<>\—\–]+[\—\–]) \“(?=\S)/, '$1” ')
//↓simulation to check the pairs
.replace(/([\"“”](?<!\=\")(?!>|\s?[\"“”]|<\/)(?:<?[^\"“”<]+?(?:<[^\"“”<]+?)?)(?:<br>[^\"“”<]+)?([\"”]|“(?=\S)))/g, '∅¢$1∅¢')
.replace(/∅¢[\"“”](\,)?\s/g, '$1 \“')
.replace(/(\"∅¢)(?=[A-Za-z])/g, '$1 ')
.replace(/, \.∅¢\s*/g, '∅¢')
.replace(/∅¢/g, '')
//↑
.replace(/”(?=\w)(?<=[^\>\,]”)/g, '” ')
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
.replace(/(\?+) (?=\!)/g, '$1')
.replace(/ ([\!\?]+)(?<=\w+(?<!a|the) \1)\.?/g, '$1')
.replace(/(‘\w+)([\.])’(?:(?<=\s\1\2’)|(?!<))/g, '$1’$2')
.replace(/’ (?<= o’ )/g, '’')
//↑↑↑
//↓↓↓↓↓↓ — italics
.replace(/(<\/?)(em|i)>/g, (_, a,l) => `${a}${l==='i'?'♠':'♠♠'}>`)
.replace(/\s(<\/♠+>)/g, '$1 ')
.replace(/(♠+(?<=\/♠+)>)\s+(?!<\/p>)/g, '$1  ')//n+h space > normal space
.replace(/(<\/♠+>\s*)([\!\?]+|[\;\.\:\,])/g, '$2$1')
.replace(/([”\"]\.?(?=<)|<♠+>)([“\"]|<\/♠+>)/g, '$2$1')
.replace(/([“\"])(<♠+>)([^♠\/]+)(<\/♠+>)([”\"])/g, '$2$1$3$5$4')
.replace(/(♠+(?<=[\!\?\;\.\,]<\/♠+)>)\s*(?=[”’\]\"])/g, '$1 ')//hair space
.replace(/(♠+(?<=\/♠+)>)(?=<♠+>)/g, '$1 ')
.replace(/♠+>/g, (m) => m === '♠>'?'i>':'em>')
//↑↑↑↑↑↑
.replace(/:(?![\s\d\/])(?<=\w\:)/g, ': ')
////↓↓↓↓↓
//’d => had
.replace(/’d\b(?<=\b[A-Za-z]+’d)\s(?=(?:(?:all|al(?:most|ready|so|ways)|completely|certainly|decisively|eve[nr]|evidently|easily|first|just|(?:actu|addition|basic|fin|initi|just|natur|origin|person|successf)[au]lly|never|not|only|previously|still|slowly|suddenly|then|long since)\s)?([a-z]+ed(?<!(?:e|\b[^])ed)|[bs]een|brought|built|began|chosen|caught|drawn|drunk|[dg]one|found|felt|forgotten|fought|fallen|gotten|got|given|grown|held|heard|kept|known|led|left|lent|learnt|lost|made|met|now|paid|sp?ent|spoken|slept|said|sunk|shown|smelt|taken|thought|thrown|told|understood|woken|won)\b)/g, ' had ')
.replace(/’d(?<=\b[A-Za-z]+’d)\s(?=(?:(?:all|al(?:most|ready|so|ways)|completely|certainly|eve[nr]|evidently|easily|first|just|(?:actu|addition|basic|fin|initi|natur|origin|person|successf)[au]lly|never|not|only|previously|still|slowly|suddenly|then|long since)\s)?(?:had\s))/g, ' had ')
//’s => has
.replace(/’s\b(?<=\b[A-Za-z]+’s)\s(?=(?:(?:all|al(?:most|ready|so|ways)|completely|certainly|eve[nr]|evidently|easily|first|just|(?:actu|addition|basic|fin|initi|natur|origin|person|successf)[au]lly|never|not|only|previously|still|slowly|suddenly|then|long since)\s)?(?:(?:exist|happen|remain)ed|been|become|began|got|had)\b(?=\s))/g, ' has ')
.replace(/’s\b(?<=\b[A-Za-z]+’s)\s(?=(?:[a-z]+ed(?<!(?:e|\b[^])ed)|[bs]een|brought|built|began|chosen|caught|drawn|drunk|[dg]one|found|felt|forgotten|fought|fallen|gotten|got|given|grown|held|heard|kept|known|led|left|lent|learnt|lost|made|met|now|paid|sp?ent|spoken|slept|said|sunk|shown|smelt|taken|thought|thrown|told|understood|woken|won)\s(?:me|them|us|her|him|it)\b)/g, ' has ')
//||has given us – he has invited us||
////↑↑↑↑↑
//↓↓↓ — 
.replace(/([\[\(])\s/g, '$1')
.replace(/\((?<=\w\()(?!\d)/g, ' (')// [  case missing on purpose
.replace(/([\]\)])(?=\w\w)/g, '$1 ')
//↑↑↑

.replace(/-(?<=\b[A-Z]\-)(Class|Rank|Cup|Shirt|Plan|Grade|Spot)/g, (_, a)=>`-${a.toLowerCase()}`)
//↓↓↓↓↓ \w to avoid "A grade" at the start of a phrase. Not applied to the beginning of phrases on purpose, even for B or C grade etc..
//↑↑↑↑↑

.replace(/([\,\?\!]+|\.+(?!(?:com|it|net|jpg|png)\b))(?=[A-Za-z])(?<=\b\w\w+[\,\?\!\.]+)/g, '$1 ')
.replace(/—(?<=\w—)(?=\w)/g, ' — ')//sixth spaces
//↓↓ — *
.replace(/\*\s?(?![^\w\*]+\*)([^\s”“\*]+) ?\*(?![a-z]) ?/g, '*$1* ')
.replace(/\* (?:(?<=\>\* )|(?=\*))/g, '*')
.replace(/\*(?<=\>\*)([^\*\<\,\?\"”“’‘]{2,18}?) \*/g, '*$1*')
//↑↑
//Test: "* * *! * * *. * * * * *!";
//↓↓↓↓↓
.replace(/<\/p>(?!<p>[a-z])(?<=[^\.]\w<\/p>)/g, '.</p>')//Dot missing at the end of <p>
//↑↑↑↑↑
//↓↓↓ fix missing “ or ” on simple|short paragraphs
.replace(/([\"”“](?<=<p>.)[\w’]+)((?:\s[\w’]+){0,2}?)([\!\?\…\.]*)(?=<\/p>)/g, '$1$2$3”')
.replace(/<p>([\w’]+)((?:\s[\w’]+){0,2}?)(?=[\!\?\…\.]*[\"”“]<\/p>)/g, '<p>“$1$2')
.replace(/<p>([A-Za-z’]+\,?)([a-zA-Z\s’]+)([\.\!\…\?]*)”/g, '<p>“$1$2$3”')
.replace(/“(?<=<p>“)((?:\s?[A-Za-z’]+){1,6}?)([\!\…\?\.]+)(?=<\/p>)/g, '“$1$2”')
//test: ||<p>“Mm, kakaa!" Bob nodded. “Bla bla’s. Blabla…”||
//↑↑↑
//↓ give p to tagless 
.replace(/\/p>(?=[^<]+<)/g, '/p><p>')
//↑
//↓↓↓↓↓↓↓ thousands separator— n ≤9999 excluded—
.replace(/,(?=\d\d\d\D)/g, '±')
.replace(/(?:\d+±)+/g, (_) => `±${_.replace(/±/g, '')}`)
.replace(/(?<=±\d\B)(?=(?:\d\d\d)+(?!\d))/g, ',')
.replace(/(±\d),(?=\d\d\d(?!,\d))/g, '$1')
.replace(/,(?<=\d\d,)(?=\d\d\d\W)/g, "<span style=\'font-size: 0.8em;\'>,</span>")
.replace(/±(?=\d)/g, '')
//↑↑↑↑↑↑↑ alternative separators:
//100𝃳000//100༌000//100˙000//100𑀀000//100ॱ000//100ᱸ000//100ʹ000//100՛000
//place images
.replace(/䷢䷢䷢(\d+)/g, (_, a) => {
return (imgs[parseInt(a)-1]);})

.replace(/♪/, '')
.replace(/\bLorem ipsum dolor( sit amet consectetuer adipiscing[^]{1,6}?elit)?/g, '🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴')
//↑ — 0

//%%%%%%%%%—My JS 

//%%%%%%%%%
;
