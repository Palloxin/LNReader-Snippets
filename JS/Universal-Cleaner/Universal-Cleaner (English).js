chapter = document.querySelector('chapter');
chapter.innerHTML = chapter.innerHTML

//↓ — 0 || performance anchors (symbol=♦)
.replace(/(^[^<]*(?:<input[^\>]+\>)?)\s*/, '$1♪')//♦start-chapter
//↓↓— 1
.replace(/\n+/g, '')
.replace(/<p id=\"spacer\">\s*<\/p>/g, '')
.replace(/(?<=$)/, '<p></p>')
//↑↑
///↓↓↓↓↓— 2
.replace(/[\u200B-\u200D\uFEFF]/g, '')//deletes zero-width spaces
.replace(/\&nbsp\;/g, ' ')//no-break-space; To make the characters in "&nbsp;" not interferee with other replacements.
.replace(/(?<=<\/?(?:p|h[1-9]|div|span)>)\s+/g, '')
.replace(/\s+(?=<\/?(?:p|h[1-9]|div|(?<=<\/)span)>)/g, '')
//↓
.replace(/<(em|span|[abi]|br|div)><\/\1>/g, '')
.replace(/(?<=<p>)<span>/g, '')
.replace(/<\/span>(?=<\/p>)/g, '')//<p><span>Haha</span></p>
//↑
.replace(/<br>(?=<\/?p>)/g, '')
///↑↑↑↑↑
//↓↓↓ —
.replace(/^\s*/, '<p></p>')
.replace(/<\/?div>/g, '<p></p>')
.replace(/<input type=\"(?:text|checkbox)\">/g, '')
.replace(/(?<!^)<p><\/p>(?!$)/g, '')//excessive <p>
.replace(/<a href=\"[^\"\>]+\">/g, '')
.replace(/(?<=<h[1-4]>)<span>([^]+?)?<\/span>/, '$1')
//↑↑↑

.replace(/(?:<br><\/?br>)+/g, '')
//↓↓↓↓↓ — masked letters
.replace(/[асᴄԁеһіјӏոоοօᴏрꜱսνᴠᴡхⅹуᴢ]/g, (aa) => {
	const fakers = {
		а: 'a', с: 'c', ᴄ: 'c', ԁ: 'd', е: 'e', һ: 'h', і: 'i', ј: 'j',
		ӏ: 'l', ո: 'n', о: 'o', ο: 'o', օ: 'o', ᴏ: 'o', р: 'p', ꜱ: 's',
		ս: 'u', ν: 'v', ᴠ: 'v', ᴡ: 'w', х: 'x', ⅹ: 'x', у: 'y', ᴢ: 'ᴢ'};
	return fakers[aa]})
//↑↑↑↑↑
//↓ — 2
.replace(/\.(?<=[a-zA-Z]\.)[a-z](?:\.[a-z])+/g, (_) => `${_.replace(/\./g, '')}`)//input: ``s.p.a.c.e.s.h.i.p`` —> output: ``spaceship``
//↑
//↓↓↓↓↓— 3
.replace(/(\d) ?(k?m)([2-9])\b/g, '$1 $2‡$3★')
.replace(/\bmeters?²/g, 'm²')
//↑↑↑↑↑
//↓↓↓—
.replace(/<sup>(\d)<\/sup>/g, '‡$1★')
.replace(/‡(\d)★/g, (_, a) => {
	const hdigg = ['⁰', '¹', '²', '³', '⁴', '⁵', '⁶', '⁷', '⁸', '⁹'];
	return hdigg[+a]})
//↑↑↑
//↓↓↓↓↓ — 
.replace(/\.(?<=\s\.)(\d\d+)/g, ' ✓+©.$1')//★↓
.replace(/\s([\.\,\;\:]+)(?<=(?:[¹²³⁴⁵⁶⁷⁸⁹]|\w+)\s\1)/g, '$1')//↑↓
.replace(/✓\+\©/g, '')//★↑
.replace(/([\.\,\:\!\?])(?<=[a-z\…]\1)(?=[A-Z]|\d(?<=,\d))/g, '$1 ')
.replace(/(?<=“\w+)\.”\.?/g, '”.')
.replace(/\,([\"”\'’])(?!\,)/g, '$1,')
.replace(/(\,) \1/g, ', ')
.replace(/\,(?<=\D\,)(?=[^\s\d\”\’\,])/g, ', ')
.replace(/ ?[\,\.]\,/g, ', ')
.replace(/(<|\\?u003c)\1/g, '&lt;&lt;').replace(/(>|\\?u003e)\1/g, '&gt;&gt;')
.replace(/\'(?<=[A-Za-z]\')(?=[A-Za-z])/g, '’')
//↑↑↑↑↑
//↓↓
.replace(/”(?=(?:t|ll|s|d|m)\s)/g, '’')
.replace(/’ll\b(?<=‘(?:it?|you|s?he|we|they)’ll)/gi, ' will')
.replace(/’ve\b(?<=‘(?:i|you|we|they)’ve)/gi, ' have')
.replace(/’m\b(?<=‘(If )?\bI’m)/g, ' am')
//↑↑
//↓↓↓↓quotation marks => DOUBLE PRIME 
.replace(/“(?<=\bthe “)([\s\-\w’]+)([\!])?”/g, '″$1″$2')
.replace(/“(?<=(?:\b\w+? |<p>(?!“\w+”[\.\,\<]))“)(\w+)”/g, '″$1″')
.replace(/“(?<=\b\w+ “)(\w+\s\w+)”(?= [a-z])/g, '″$1″')
.replace(/“(?<=\b[a-z]+ “)([a-z]+\s[a-z]+)”(?= [A-Za-z])/g, '″$1″')
.replace(/(“\S[^\"”“<]+\s)“([\s\w’]+)”(?=\W[^\"”“<]*?”)/g, '$1″$2″$3')
.replace(/″([^″]+)″/g, '\″ ⁠$1 ⁠″')//hair space + \u2060(avoid break)
//<p>The “seriously injured” is fake.</p>
//“I saw the “Four Spirits body”, it's great”
//↑↑↑↑
////↓↓↓↓↓ — 
.replace(/(?:‘|’(?<=\W’)(?!s?\s))([^\"”“\'’‘\<]+)(?:(?<!\s)‘|’(?![a-z]))/g, '‘$1’')//test-strings: ``Can’t u do the ’job’?``|||``‘He said ‘something’!’``|||``‘We don’t!’ They said on the Merfolk Pirates’ deck.``|||
.replace(/”(?<=[^\s\>\,]”)(?=\w)/g, '” ')
.replace(/”(?<=(?:<p>|, |”|\: ?|\. |–|—)”)/g, '“')
.replace(/“(?=<\/p>)/g, '”')
.replace(/’(?<=(?:<p>|, )’)/g, '‘')
.replace(/‘(?:<\/p>)/g, '’')
.replace(/’(?<![\s\w]’)(?=\w\w\w+)/g, '’ ')
.replace(/(?<=<p>|\: )[\"“][\"”“]/g, '“')
.replace(/(?: ([\”’])|([\“‘]) )/g, '$1$2')
.replace(/(?<=\w+[\?\!\.\…]+)((?!\"\")[\"”“][\"”“])(?=\w)/g, '∆∆$1')
.replace(/∆∆([\"”“])([\"”“])/g, '$1 $2')
.replace(/(?!\"\")[\"”“][\"”“]/g, '\"')
.replace(/“(?<=[^\s\>]“)/g, ' “')
.replace(/(“[^\"”“<>\—\–]+[\—\–]) \“(?=\S)/, '$1” ')
//↓simulation to check the pairs
.replace(/([\"“”](?<!\=\")(?! offline\=\")(?:[^\"“”<]+?)(?:<br>[^\"“”<]+)?([\"”]|“(?=\S)))/g, '∅¢$1∅¢')
.replace(/∅¢[\"“”](\,)?\s/g, '$1 \“')
.replace(/(?<=\"∅¢)(?=[A-Za-z])/g, ' ')
.replace(/\s(?<=[^\,]\s)[\"“”]∅¢/g, '\”©© ')
.replace(/∅¢/g, '')
//↑
.replace(/”(?<=[^\>\,]”)(?=\w)/g, '” ')
//test-strings:
//AAAAAAAAAAAA↓↓
//||“With this I’m immune to it,“ Leylin nodded.||
//||<p>“Neela’s smiled, “I’ll serve my king!”</p>||
//||Bob sat down. ”Good!”||
//||<p>“To Victory! “To Victory!” “Long Live Stewart!” “Long Live Stewart!”.</p>||

////↑↑↑↑↑
//↓↓↓↓↓↓↓ excessive space — **don't put `.replace`(ments) that add 2+ spaces consecutively above this line**
.replace(/\s\s+/g, ' ')//faster than /\s{2,}/
//↑↑↑↑↑↑↑
//↓↓↓ — 
.replace(/ ?(\?+)(?: ?(\!))?/g, '$1$2')
.replace(/ \!(?<=\w+ \!)/g, '!')
.replace(/([\?\!])\./g, '$1')
//↑↑↑
//↓↓↓↓↓↓ — italics
.replace(/<(\/)?em>/g, '<$1i>')
.replace(/<i>(?<=(?:[^<>“]|\bspan>)<i>)\s?/g, ' <i>')//thin space
.replace(/<\/i>\s+/g, '</i>  ')//thin+hair space > normal space
.replace(/(<\/i>\s+)([\!\?\;\.\:\,]+)/g, '$2$1')
.replace(/<\/i>\s+([’‘”“])/g, '</i>  $1')//sixth+thin space
//↑↑↑↑↑↑
.replace(/\:(?<=\w\:)(?=[^\s\d\/])/g, ': ')
//↓↓↓↓ — three dots
.replace(/(?:\. ?…|…\.\.)/g, '….')
.replace(/ ?(?:\.\.\.|…|(?<!\. )\. \. \.(?! \.)) ?/g, '…')
.replace(/…(?<=\w…)…?\.?(\w)/g, '…⅞⅘ $1')//thin space
.replace(/⅞⅘(?:\s([TYVW]))/g, ' $1').replace(/⅞⅘/g, '')
.replace(/…(?<!\w…)…?\s(?=\w)/g, '…')
.replace(/…(?<=[^’](\b\w+)…)…?\s(\1)\B/gi, '…$1')//Bo…Bobby!!
.replace(/…(?<=So…)(?=Some)/g, '… ')//exception
.replace(/…(?<=\b(\w+)…)…?\s(\1)\b/g, '… $1')//sixth space
.replace(/…(?<=[^\s\w\…\"“‘\'\>\%]…)…?(?![\<\'\"’”\|])/g, ' …')
.replace(/…\.(?<=[\s“]…\.)\s/g, '…')
.replace(/…(?=[AJ])/g, '… ')//thin-s
.replace(/…([a-zA-Z][a-zA-Z\s]{1,20})…/g, '..$1…')
.replace(/\bI…I(?=[A-Za-z])/g, 'I-I')
//↑↑↑↑
//↓↓ — two dots  => [\u2025] ‥
.replace(/\.(?<!\.)\.(?!\.)/g, '‥')
//↑↑
////↓↓↓↓↓
//’d => had
.replace(/’d\b(?<=\b[A-Za-z]+’d)\s((?:all|al(?:most|ready|so|ways)|completely|certainly|decisively|eve[nr]|evidently|easily|first|just|(?:actu|addition|basic|fin|initi|natur|origin|person|successf)[au]lly|never|not|only|previously|still|slowly|suddenly|then|long since)\s)?([a-z]+ed(?<!(?:e|\b[^])ed)|[bs]een|(?:br|f|th)ought|built|began|chosen|caught|drawn|[dg]one|found|felt|forgotten|fallen|gotten|got|given|grown|held|heard|kept|known|led|left|learnt|lost|made|met|now|obviously|paid|sp?ent|said|sunk|shown|smelt|taken|thrown|understood|woken|won)\b/g, ' had $1$2')
.replace(/’d(?<=\b[A-Za-z]+’d)\s((?:all|al(?:most|ready|so|ways)|completely|certainly|eve[nr]|evidently|easily|first|just|(?:actu|addition|basic|fin|initi|natur|origin|person|successf)[au]lly|never|not|only|previously|still|slowly|suddenly|then|long since)\s)?(had\s)/g, ' had $1 $2')
//’s => has
.replace(/’s\b(?<=\b[A-Za-z]+’s)\s((?:all|al(?:most|ready|so|ways)|completely|certainly|eve[nr]|evidently|easily|first|just|(?:actu|addition|basic|fin|initi|natur|origin|person|successf)[au]lly|never|not|only|previously|still|slowly|suddenly|then|long since)\s)?((?:happen|remain)ed|been|began|got|had)\b/g, ' has $1$2')
//has given us
////↑↑↑↑↑
//↓↓↓ — 
.replace(/(\(|\[) /g, '$1')
.replace(/ (?=\)|\])/g, '')
.replace(/\((?<=\w\()(?!\d)/g, ' (')// [  case missing on purpose
.replace(/(\)|\])(\w\w)/g, '$1 $2')
//↑↑↑

.replace(/-(?<=\b[A-Z]-)(Class|Rank|Cup|Shirt|Plan|Grade|Spot)/g, (_, a)=>`-${a.toLowerCase()}`)
//↓↓↓↓↓ \w to avoid "A grade" at the start of a phrase. Not applied to the beginning of phrases on purpose, even for B or C grade etc..
.replace(/\b(?<=(?:\w+|[\,\%]) [A-Z]) ([Gg]rade|[Rr]ank)\b/g, (_, a)=>`-${a.toLowerCase()}`)
//↑↑↑↑↑

.replace(/(?<=[\,\?\!]|\.(?!(?:com|it|net)\b)(?<=\b\w\w+\.))(?=[A-Za-z])/g, ' ')//gives space to punctuation
.replace(/—(?<=\w—)(?=\w)/g, ' — ')//sixth spaces
//↓↓ — *
.replace(/\* ?([^\s”“\*]+) ?[\*\”] ?/g, '*$1* ')
.replace(/\*(?<=\>\*) /g, '*')
.replace(/\*(?<=\>\*)([^\*\<\,\?\"”“’‘]{2,18}?) \*/g, '*$1*')
//↑↑
//↓↓↓↓↓
.replace(/<\/p>(?<=[^\.]\w<\/p>)/g, '.</p>')//Dot missing at the end of <p>
//↑↑↑↑↑
//↓↓↓ fix missing “ or ” on simple|short paragraphs
.replace(/(<p>[\"”“](?:[\w’]+))((?:\s[\w’]+){0,2}?)([\!\?\…\.]*)(?=<\/p>)/g, '$1$2$3”')
.replace(/(?<=\<p>)([\w’]+)((?:\s[\w’]+){0,2}?)([\!\?\…\.]*[\"”“]<\/p>)/g, '“$1$2$3')
.replace(/(<p>)([A-Za-z’]+\,?)([a-zA-Z\s’]+)([\.\!\…\?]*)”/g, '$1“$2$3$4”')
.replace(/(<p>|\, )“((?:\s?[A-Za-z’]+){1,6}?)([\!\…\?\.]+)(<\/p>)/g, '$1“$2$3”$4')
.replace(/“(?<=\<p>“)(\w+\,(?:\s?[A-Za-z’]+){1,6}[\!\…\?\.]+)([^<>“”]+)\s?”©©\s?([^<>”“]+”<\/)/g, '“$1”$2 “$3')
.replace(/©©/g, '')
//test: ||<p>“Mm, kakaa!" Bob nodded. “Bla bla’s. Blabla…”||
//↑↑↑
//↓↓↓↓↓↓↓ thousands separator— n ≤9999 excluded—

//↑↑↑↑↑↑↑ alternative separators:
//100𝃳000//100༌000//100΄000//100𑀀000//100ॱ000//100ᱸ000//100ʹ000//100՛000

//↓ give p to tagless 
.replace(/<\/p>(?=[^<>]+<)/g, '<p>')
//↑

.replace(/♪/, '')
//↑ — 0

//%%%%%%%%%—My JS

//%%%%%%%%%

;

//↓↓↓↓ — Script activation marker
chapter = document.querySelector('chapter');
chapter.innerHTML = chapter.innerHTML
.replace(/\bLorem ipsum dolor( sit amet consectetuer adipiscing[^]{1,6}?elit)?/g, '🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴')
;
