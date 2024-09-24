let imgs = [];
chapter = document.querySelector('#LNReader-chapter');
chapter.innerHTML = chapter.innerHTML

//store images
.replace(/=(?<=src=)\"[^\"]+\">/g, (y) => {
imgs.push(y); return "䷢䷢䷢"+imgs.length;})
//↓ — 0 || performance anchors (symbol=♦)
.replace(/(?<=^[^<]*(?:<input[^\>]+\>)?)[\s\n]*/, '♪')//♦start-chapter
//↓↓— 1
.replace(/\n+/g, '')
.replace(/<title>[^<]*<\/title>/, '')//EPUBs
.replace(/&nbsp;/g, ' ')//no-break-space; To make "&nbsp;" not interferee with other replacements.
.replace(/<(em|span|[abip]|div)\b[^>]*>\s*<\/\1>/g, '')
//↑↑
///↓↓↓↓↓— 2
.replace(/[\u200B-\u200D\uFEFF](?=<\/p>)/g, '')
.replace(/<p\b[^>]+>/g, '<p>')
.replace(/(?<=<\/?(?:p|h[1-9]|div|span(?!>\s+<(?:em|i)>))>)\s+/g, '')
.replace(/\s+(?=<\/?(?:p|h[1-9]|div|(?<=<\/)span)>)/g, '')
//↓
.replace(/<span>(?<=<p><span>)/g, '')
.replace(/<\/span>(?=<\/p>)/g, '')//<p><span>Haha</span></p>
//↑
.replace(/<br>\s*(?=<\/?p>)/g, '')
///↑↑↑↑↑
//↓↓↓ —
.replace(/<p><\/p>/g, '')//excessive <p>
.replace(/(?:^[\s\n]*|$)/, '<p></p>')
.replace(/<\/?div(?: id=[^>]+)?>/g, '')
.replace(/<input type[^>]+>/g, '')
.replace(/<a href=\"[^\"\>]+\">/g, '')
.replace(/(?<=<h[1-4]>)<span>([^]+?)<\/span>/, '$1')
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
.replace(/(?<=\d) ?(k?m)([2-9])\b/g, '$1‡$2★')
.replace(/\bmeters?²/g, 'm²')
//↑↑↑↑↑
//↓↓↓—
.replace(/<sup>(\d)<\/sup>/g, '‡$1★')
.replace(/‡(\d)★/g, (_, a) => {
	const hdigg = ['⁰', '¹', '²', '³', '⁴', '⁵', '⁶', '⁷', '⁸', '⁹'];
	return hdigg[+a]})
//↑↑↑
//↓↓↓↓↓ — 
.replace(/\.(?=\d\d+)(?<=\s\.)/g, '✓+®.')//★↓
.replace(/®(?=\.\d+%)/g, '®0')//↓
.replace(/\s(?=[\.\,\]\)\:\;]+)(?<=(?:[¹²³⁴⁵⁶⁷⁸⁹]|\w+)\s)/g, '')//↑↓
.replace(/✓\+®/g, '')//★↑
.replace(/([\.\,\:\!\?])(?<=[a-z\…]\1)(?=[A-Z]|\d(?<=,\d))/g, '$1 ')
.replace(/(?<=“\w+)\.”\.?/g, '”.')
.replace(/([\"“”])(?<!\=\")(?!>|\s[\"“”])([^\"“”]+)([\"”])(?<!=\")/g, '→→$1$2$3←←')
.replace(/\,([\"”](?=←←)|[\'’](?=\W))/g, '$1,')//comma
.replace(/(?:←←|→→)/g, '')
.replace(/, ?,/g, ', ')
.replace(/\,(?=[^\s\d\”\’\,])(?<=\D\,)/g, ', ')
.replace(/ ?[\,\.]\,/g, ', ')
.replace(/\'(?<=[A-Za-z]\')(?=[A-Za-z])/g, '’')
//↑↑↑↑↑
//↓↓
.replace(/[”“](?=(?:t|ll|s|d|m)\b(?!-))/g, '’')
.replace(/’ll\b(?<=‘(?:it?|you|s?he|we|they)’ll)/gi, ' will')
.replace(/’ve\b(?<=‘(?:i|you|we|they)’ve)/gi, ' have')
.replace(/’m\b(?<=‘(If )?\bI’m)/g, ' am')
//↑↑

//↓↓↓↓quotation marks => DOUBLE PRIME 
.replace(/“(?<=\bthe “)([\s\-\w’]+)([\!])?”/g, '″$1″$2')
.replace(/[”“\"](?<=\b\w+ [“”\"])(\w+|[\?\!])[”\"]/g, '″$1″')
.replace(/“(?<=\b\w+ “)(\w+\s\w+)”(?= [a-z])/g, '″$1″')
.replace(/“(?<=\b[a-z]+ “)([a-z]+\s[a-z]+)”(?= [A-Za-z])/g, '″$1″')
.replace(/(?<=“\S[^\"”“<]+\s)“([\s\w’]+)”(?=\W[^\"”“<]*?”)/g, '″$1″')
.replace(/[“\"](?<=\b[a-z]+ [“\"])([a-z\s’]+(?<!’))[”\"]/g, '″$1″')
.replace(/\"(?<=\b(?:or|as?|the|to) \")([A-Za-z’\s]+)\"/g, '″$1″')
//<p>The “ab bb” is fake.</p>
//“I saw the “Ack Bac aa”, it's great
//Go in "place" and...
//DOESNT WORK //<p>"It is so", Aina said, "he did say: "I didnt do it." to me."</p>
//Anastasia sneered; "Weren’t you busy "Crafting"?"
///↑↑↑↑
////↓↓↓↓↓ — 
.replace(/(?:‘|’(?<=\W’)(?!s?\s))([^\"”“\'’‘\<]+)(?:(?<!\s)‘|’(?![a-z]))/g, '‘$1’')//test-strings: ``Can’t u do the ’job’?``|||``‘He said ‘something’!’``|||``‘We don’t!’ They said on the Merfolk Pirates’ deck.``|||
.replace(/”(?=\w)(?<=[^\s\>\,]”)/g, '” ')
.replace(/”(?<=(?:<p>|, |”|\: ?|\. |–|—)”)/g, '“')
.replace(/“(?=<\/p>)/g, '”')
.replace(/’(?<=(?:<p>|, )’)/g, '‘')
.replace(/‘(?=<\/p>)/g, '’')
.replace(/’(?=\w\w\w+)(?<![\s\w]’)/g, '’ ')
.replace(/[\"“](?<=<p>[\"“])[\"”“]/g, '“')
.replace(/(?=[\"”“][\"”“](?<!\"\")\w)(?<=\w+[\?\!\.\…]+)/g, '∆∆')
.replace(/∆∆([\"”“])([\"”“])/g, '$1 $2')
.replace(/[\"”“][\"”“](?<!\"\")/g, '\"')
.replace(/“(?<=[^\s\>]“)/g, ' “')
.replace(/(?<=“[^\"”“<>\—\–]+[\—\–]) \“(?=\S)/, '” ')
//↓simulation to check the pairs
.replace(/([\"“”](?<!\=\")(?! offline\=\")(?:[^\"“”<]+?)(?:<br>[^\"“”<]+)?([\"”]|“(?=\S)))/g, '∅¢$1∅¢')
.replace(/∅¢[\"“”](\,)?\s/g, '$1 \“')
.replace(/(?<=\"∅¢)(?=[A-Za-z])/g, ' ')
.replace(/, ([^]∅¢)/g, '$1,')
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
.replace(/\s\s+/g, ' ')
//↑↑↑↑↑↑↑
//↓↓↓ — 
.replace(/(?<=\?+) (?=\!)/g, '')
.replace(/ ([\!\?]+)(?<=\w+(?<!a|the) [\!\?]+)\.?/g, '$1')
.replace(/’ (?<= o’ )/g, '’')
//↑↑↑
//↓↓↓↓↓↓ — italics
.replace(/(?<=<\/?)(?:em|i)>/g, (l) => l === 'i>' ? '♠>' : '♠♠>')
.replace(/\s*<(♠+)>(?<=[^<>“]\s?<♠+>)\s*/g, ' <$1>')//thin space
.replace(/(?<=♠+(?<=\/♠+)>)\s+/g, '  ')//thin+hair space > normal space
.replace(/(<\/♠+>\s*)([\!\?\;\.\:\,]+)/g, '$2$1')
.replace(/([”\"]\.?(?=<)|<♠+>)([“\"]|<\/♠+>)/g, '$2$1')
.replace(/([“\"])(<♠+>)([^♠\/]+)(<\/♠+>)([”\"])/g, '$2$1$3$5$4')
.replace(/(?<=♠+(?<=[\!\?\;\.\,]<\/♠+)>)\s*(?=[”’\]\"])/g, ' ')//hair space
.replace(/♠+>/g, (m) => m === '♠♠>' ? 'em>' : 'i>')
//↑↑↑↑↑↑
.replace(/:(?=[^\s\d\/])(?<=\w\:)/g, ': ')
///↓↓↓↓ — three dots
.replace(/(?:\. ?…|…\.\.)/g, '….')
.replace(/\s?(?:\.\.\.|…|(?<!\. )\. \. \.(?! \.)) ?/g, '…')
.replace(/…(?<=\w…)…?\.?(\w)/g, '…⅞⅘ ')//thin space
.replace(/⅞⅘(?:\s([TYVW]))/g, ' $1').replace(/⅞⅘/g, '')
.replace(/…(?<!\w…)…?\s(?=\w)/g, '…')
.replace(/…(?<=[^’](\b\w+)…)…?\s\1\B/gi, '…$1')//Bo…Bobby!!
//↓exceptions
.replace(/…(?<=So…)(?=Some\b)/, '… ')
.replace(/…(?<=No…)(?=Not\b)/, '… ')
//↑
.replace(/…(?<=\b(\w+)…)…?\s\1/g, '… $1')//sixth space
.replace(/…(?<=[^\s\w\…\"“‘\'\>\%]…)…?(?![\<\'\"’”\|])/g, ' …')
.replace(/…\.(?<=[\s“]…\.)\s/g, '…')
.replace(/…(?=[AJ])/g, '… ')//hair-s
.replace(/…([a-zA-Z][a-zA-Z\s]{1,20})…/g, '‥$1…')
.replace(/…(?<=\bI…)I(?=[A-Za-z])/g, 'I-I')
///↑↑↑↑
////↓↓↓↓↓
//’d => had
.replace(/’d\b(?<=\b[A-Za-z]+’d)\s(?=(?:(?:all|al(?:most|ready|so|ways)|completely|certainly|decisively|eve[nr]|evidently|easily|first|just|(?:actu|addition|basic|fin|initi|just|natur|origin|person|successf)[au]lly|never|not|only|previously|still|slowly|suddenly|then|long since)\s)?([a-z]+ed(?<!(?:e|\b[^])ed)|[bs]een|(?:br|f|th)ought|built|began|chosen|caught|drawn|[dg]one|found|felt|forgotten|fallen|gotten|got|given|grown|held|heard|kept|known|led|left|lent|learnt|lost|made|met|now|paid|sp?ent|slept|said|sunk|shown|smelt|taken|thrown|told|understood|woken|won)\b)/g, ' had ')
.replace(/’d(?<=\b[A-Za-z]+’d)\s(?=(?:(?:all|al(?:most|ready|so|ways)|completely|certainly|eve[nr]|evidently|easily|first|just|(?:actu|addition|basic|fin|initi|natur|origin|person|successf)[au]lly|never|not|only|previously|still|slowly|suddenly|then|long since)\s)?(?:had\s))/g, ' had ')
//’s => has
.replace(/’s\b(?<=\b[A-Za-z]+’s)\s(?=(?:(?:all|al(?:most|ready|so|ways)|completely|certainly|eve[nr]|evidently|easily|first|just|(?:actu|addition|basic|fin|initi|natur|origin|person|successf)[au]lly|never|not|only|previously|still|slowly|suddenly|then|long since)\s)?(?:(?:exist|happen|remain)ed|been|become|began|got|had)\b(?=\s))/g, ' has ')
.replace(/’s\b(?<=\b[A-Za-z]+’s)\s(?=(?:[a-z]+ed(?<!(?:e|\b[^])ed)|[bs]een|(?:br|f|th)ought|built|began|chosen|caught|drawn|[dg]one|found|felt|forgotten|fallen|gotten|got|given|grown|held|heard|kept|known|led|left|lent|learnt|lost|made|met|now|obviously|paid|sp?ent|said|sunk|shown|slept|smelt|taken|thrown|told|understood|woken|won)\s(?:me|them|us|her|him|it)\b)/g, ' has ')
//||has given us – he has invited us||
////↑↑↑↑↑
//↓↓↓ — 
.replace(/(?<=[\[\)])\s/g, '')
.replace(/\((?<=\w\()(?!\d)/g, ' (')// [  case missing on purpose
.replace(/(?<=[\]\)])(?=\w\w)/g, ' ')
//↑↑↑

.replace(/-(?<=\b[A-Z]\-)(Class|Rank|Cup|Shirt|Plan|Grade|Spot)/g, (_, a)=>`-${a.toLowerCase()}`)
//↓↓↓↓↓ \w to avoid "A grade" at the start of a phrase. Not applied to the beginning of phrases on purpose, even for B or C grade etc..
//↑↑↑↑↑

.replace(/([\,\?\!]+|\.+(?!(?:com|it|net|jpg|png)\b))(?=[A-Za-z])(?<=\b\w\w+[\,\?\!\.]+)/g, '$1 ')
.replace(/—(?<=\w—)(?=\w)/g, ' — ')//sixth spaces
//↓↓ — *
.replace(/\* ?([^\s”“\*]+) ?\*(?![a-z]) ?/g, '*$1* ')
.replace(/\*(?<=\>\*) /g, '*')
.replace(/\*(?<=\>\*)([^\*\<\,\?\"”“’‘]{2,18}?) \*/g, '*$1*')
//↑↑
//↓↓↓↓↓
.replace(/(?=<\/p>(?<=[^\.]\w<\/p>)(?!<p>[a-z]))/g, '.')//Dot missing at the end of <p>
//↑↑↑↑↑
//↓↓↓ fix missing “ or ” on simple|short paragraphs
.replace(/(?<=<p>[\"”“](?:[\w’]+))((?:\s[\w’]+){0,2}?)([\!\?\…\.]*)(?=<\/p>)/g, '$1$2”')
.replace(/(?<=<p>)([\w’]+)((?:\s[\w’]+){0,2}?)(?=[\!\?\…\.]*[\"”“]<\/p>)/g, '“$1$2')
.replace(/(?<=<p>)([A-Za-z’]+\,?)([a-zA-Z\s’]+)([\.\!\…\?]*)”/g, '“$1$2$3”')
.replace(/“(?<=(?:<p>|\, )“)((?:\s?[A-Za-z’]+){1,6}?)([\!\…\?\.]+)(?=<\/p>)/g, '“$1$2”')
//test: ||<p>“Mm, kakaa!" Bob nodded. “Bla bla’s. Blabla…”||
//↑↑↑
//↓ give p to tagless 
.replace(/(?<=\/p>)(?=[^<]+<)/g, '<p>')
//↑
//↓↓↓↓↓↓↓ thousands separator— n ≤9999 excluded—
.replace(/,(?=\d\d\d\D)/g, '±')
.replace(/(?:\d+±)+/g, (_) => `±${_.replace(/±/g, '')}`)
.replace(/(?<=±\d\B)(?=(?:\d\d\d)+(?!\d))/g, ',')
.replace(/(?<=±\d),(?=\d\d\d(?!,\d))/g, '')
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
