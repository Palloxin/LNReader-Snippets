chapter = document.querySelector('chapter');
chapter.innerHTML = chapter.innerHTML
//↓ — 0 || performance anchors (symbol=♦)
.replace(/(^[^<]*(?:<input[^\>]+\>)?)\s?/, '$1♪')//♦start-chapter
//↓↓↓↓↓— 1
.replace(/[\u200B-\u200D\uFEFF]/g, '')//deletes zero-width spaces
.replace(/\&nbsp\;/g, ' ')//no-break-space; To make the characters in "&nbsp;" not interferee with other replacements.
.replace(/(?:\s+<\/?(?:p|h[1-9]|div|i|em)>|<\/?(?:p|h[1-9]|div)>\s+)/g, (_) => `${_.replace(/\s+/, '')}`)
.replace(/<br>(?<=\/(?:p>|h[1-5]>)<br>)(?=<p>)/g, '')
//↑↑↑↑↑
//↓↓↓ —
.replace(/♪(?!<p>)/, '♪<p></p>')//add space at the start
.replace(/<p><\/p>/g, '')//excessive <p>
.replace(/<div>(?=[^\<\s])/g, '<p>')
.replace(/<\/?div>/g, '')
.replace(/<a href=\"[^\"\>]+\">/g, '')
.replace(/(<h[1-4]>)<span>([^]+?)?<\/span>/, '$1$2')
//↑↑↑

.replace(/(?:<br><\/?br>)+/g, '')
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
.replace(/([\.\,\:\!\?])(?<=[a-z\…]\1)(?=[A-Z])/g, '$1 ')
.replace(/(“\w+)\.”\.?/g, '$1”.')
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
.replace(/″([^″]+)″/g, '\″ ⁠$1 ⁠″')//hair spaces + \u2060(avoid break)
//<p>The “seriously injured” is fake.</p>
//“I saw the “Three Spirits body”, it's great”
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
.replace(/<i>(?<=[^<>“]<i>)\s?/g, ' <i>')//thin space
.replace(/<\/i>\s?/g, '</i>  ')//thin+hair space > normal space
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
////↓↓
//’d => had
.replace(/’d\b(?<=\b[A-Za-z]+’d)\s((?:all|al(?:most|ready|so|ways)|completely|certainly|decisively|eve[nr]|evidently|easily|first|just|(?:actu|addition|basic|fin|initi|natur|origin|person|successf)[au]lly|never|not|only|previously|still|slowly|suddenly|then|long since)\s)?([a-z]+ed(?<!(?:e|\b[^])ed)|[bs]een|(?:br|f|th)ought|built|began|chosen|caught|drawn|[dg]one|found|felt|forgotten|fallen|gotten|got|given|grown|held|heard|kept|known|led|left|learnt|lost|made|met|now|obviously|paid|sp?ent|said|sunk|shown|smelt|taken|thrown|understood|woken|won)\b/g, ' had $1$2')
.replace(/’d(?<=\b[A-Za-z]+’d)\s((?:all|al(?:most|ready|so|ways)|completely|certainly|eve[nr]|evidently|easily|first|just|(?:actu|addition|basic|fin|initi|natur|origin|person|successf)[au]lly|never|not|only|previously|still|slowly|suddenly|then|long since)\s)?(had\s)/g, ' had $1 $2')
//’s => has
.replace(/’s\b(?<=\b[A-Za-z]+’s)\s((?:all|al(?:most|ready|so|ways)|completely|certainly|eve[nr]|evidently|easily|first|just|(?:actu|addition|basic|fin|initi|natur|origin|person|successf)[au]lly|never|not|only|previously|still|slowly|suddenly|then|long since)\s)?((?:happen|remain)ed|been|began|got|had)\b/g, ' has $1$2')
//has given us
////↑↑
//↓↓↓↓↓ — 
.replace(/(\(|\[) /g, '$1')
.replace(/ (?=\)|\])/g, '')
.replace(/\((?<=\w\()(?!\d)/g, ' (')// [  case missing on purpose
.replace(/(\)|\])(\w\w)/g, '$1 $2')
//↑↑↑↑↑

.replace(/-(?<=\b[A-Z]\-)(Class|Rank|Cup|Shirt|Plan|Grade|Spot)/g, (_, a)=>`-${a.toLowerCase()}`)
//↓↓↓ \w to avoid "A grade" at the start of a phrase. Not applied to the beginning of phrases on purpose, even for B or C grade etc..
.replace(/\b([A-Z]) (?<=(\w+|[\,\%]) \b[A-Z] )([Gg]rade|[Rr]ank)\b/g, (_, a,b,c)=>`${a}-${c.toLowerCase()}`)
//↑↑↑

.replace(/([\,\?\!]|\.(?!(?:com|it|net)\b))(?<=\b\w\w+\1})([A-Za-z])/g, '$1 $2')
.replace(/(?<=<p>)H(ehe|aha)([^\<\"”“\>]+”)/g, '\“H$1$2')//On MTLs it has often “ missing.
.replace(/—(?<=\w—)(?=\w)/g, ' — ')//sixth spaces
//↓↓ — *
.replace(/\* ?([^\s”“\*]+) ?[\*\”] ?/g, '*$1* ')
.replace(/\*(?<=\>\*) /g, '*')
.replace(/\*(?<=\>\*)([^\*\<\,\?\"”“’‘]{2,18}?) \*/g, '*$1*')
//↑↑
//↓↓↓↓↓
.replace(/<(?<=[^\-]\b[a-z]+\<)\/p><p>([a-z])/g, ' $1')//link two wrongly separated <p>
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
.replace(/,(\d\d\d)/g, '$1')
.replace(/\b(\d\d)(\d\d\d?)(?=\b|[A-Za-z]+?)/g, '$1‰‰$2')
.replace(/\B(?=(\d{3})+(?!\d))/g, '༌')
.replace(/\b(\d\d)‰‰(\d\d\d)/g, '$1$2')
.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
.replace(/(\d\d)‰‰(\d\d)/g, '$1$2')
//↑↑↑↑↑↑↑ alternative separators:
//100𝃳000//100༌000//100΄000//100𑀀000//100ॱ000//100ᱸ000//100ʹ000//100՛000

//↓ tagless - only the last
.replace(/<\/p>(?=[^<>]+<)/g, '</p>™™™')
.replace(/™™™(?=[^™]+™)/, '')
.replace(/™™™[^<>]+(?=<)/g, '<p>###</p>')
//↑

.replace(/♪/, '')
//↑ — 0