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
.replace(/&nbsp;\s*/g, '\u00a0')//to include it with \s
.replace(/<span style=\"font-[^:]+: ?(bold|italic);?\">((?:[^](?!<span[> ]))*?<)\/span>/g, (_, a,b) => /^i/.test(a)?'<em>'+b+'/em>':'<strong>'+b+'/strong>')
.replace(/\s+(?:(?=[’‘\'"”“]?<\/?(?:p|h[1-9]|div)[> ])|((?:<\/(?:[abi]|em|span|strong)>\s*)+))/g, (_, a) => a?`${a.replace(/\s/g, '')} `:'')//move out outer spaces
.replace(/<div(?: [^>]+)?>((?!<(?:div|p|table)[> ])(?:[^](?!<(?:div|p|table)[> ]))*?)<\/div>/g, '<p>$1</p>')//div ➟ p
.replace(/<(em|span|[abip]|div)(?: [^>]+)?>\s*<\/\1>/g, '')
.replace(/<table(?: [^>]+)?>[^]+?<\/table>/g, (_) => `<div style=\"overflow:scroll\">${_.replace(/(<\/?)p(?=[> ])/g, '$1div')}<\/div>`)//table overflow
.replace(/=\"(?=[ >])/g, '=\"\"')//weird case
//↑↑
///↓↓↓↓↓— 2
.replace(/<p [^>]+>/g, '<p>')
.replace(/(<\/?(?:p|h[1-9]|div)>)\s+/g, '$1')
//↓
.replace(/<(span|strong)>(?:[^](?![/<]span>|<\/?p>))+?<\/span>(?:(?:<(?!\/?p>|\/\1>)[^>]+>|\s)*?<span>(?:[^](?![/<]span>|<\/?p>))+?<\/span>)+/g, _ => `${_.replace(/<\/(span|strong)>([^]*?)<\1>/g, '$2')}`)//tag clog - jsbench.me/6emevgz4ox - regex101.com/r/DN3j6I
//↑
.replace(/<br>\s*(?=<\/?p>)/g, '')
///↑↑↑↑↑
//↓↓↓ —
.replace(/<p><\/p>/g, '')//excessive <p>
.replace(/^\s*|$/g, '<p></p>')
.replace(/<(?:input type|\/?a\b)(?: [^>]+)?>/g, '')
.replace(/(<h[1-4]>)<span>([^]+?)<\/span>/, '$1$2')
//↑↑↑

//.replace(/(?:<br>\s*)+(?=<br>\s*<br>)/g, '')
//.replace(/(?:<br><\/?br>)+(?=<)/g, '')
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
.replace(/\. ?…|…[\.\s]\.(?!\.)/g, '….')
.replace(/(?:\s?\.\.\.|\s…\s*|(?:\s(?<!\..))?\. \. \.(?! \.) ?)/g, '…')
.replace(/\.\.\b/g, '‥')
.replace(/…(?<=(?:\w|[a-z][’\'\"\”])…)…?\.?(?=[A-Z]|[a-z])/g, '…⅞⅘ ')//thin space
.replace(/⅞⅘\s(?=[TYVW])/g, ' ').replace(/⅞⅘/g, '')
.replace(/…(?<=\W[\"\"‘“].)\s/g, '…')
.replace(/…(?<![\w\'\"”’\]\?]…)…?\s\b/g, '…')
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
.replace(/\s+(?=[\.\,\]\)\;]+|:(?![\)\s]))(?<=[\w\.\]]\s{1,5})/g, '')//↑↓
.replace(/✓\+®/g, '')//★↑
.replace(/([\,\:]|\.(?<!…\.)|[\!\?]+)(?<=[a-z\…]\1)(?=[A-Z]|\d(?<=,\d))/g, '$1 ')
.replace(/\/watch\? \b/g, '/watch?')//yt links
.replace(/\.[”\"]\.(?<=[“\"]\w+\b\..\.)/g, '”.')
.replace(/<(?=\/?(?:p|div|h[1-9r]|br>\s*<br)(?: [^>]+)?>)/g, '𛖠<')//\u1b5a0
.replace(/([\"“”])(?<!\=\")(?!>|\s[\"“”])([^\"“”𛖠]+)([\"”])(?<!=\")/g, '→→$1$2$3←←').replace(/𛖠/g, '')
.replace(/\,([\"”]←←(?!(?:[^](?!\/p>|[\"”“][^a-z]))*?[\"”“][a-z])(?:<\/(?:strong|em|span|[bai])>)*|[\'\]’]\B)/g, '$1,')//regex101.com/r/ni3BdT/14
.replace(/←←|→→/g, '')
.replace(/,(?:,[, ]*|(?!(?:<\/?[a-z]+>)?[\s\d\”\"\’;])(?<=\D\,))/g, ', ')
//↑↑↑↑
//↓↓↓  — apostrophe ( ' => ’ )
.replace(/\'(?<=[A-Za-z]\')(?=[A-Za-z])/g, '’')
.replace(/\'(?<![\w=]\')([^><]+?)\'(?![^\'<]+\')/g, (_, a) => {
    let t = /\'(?<!(?:[\s\W]|[^Ss]).)/g;
    return `'${t.test(a)?a.replace(t, '’').replace(/’(?<=\'[^\'’]+’)(?=[^\']+$)/, '\''):a}'`})
.replace(/\'(?<!\<\/?p>.)(?!<\/?p>)(?<=<p>[^\']+?\')(?=[^\w\'][^\']+?<\/p>)/g, '’')//<p>[^\']+?
// - jsfiddle.net/hjgmovt9/
//↑↑↑ - jsfiddle.net/69zbg81a/1/
//↓
.replace(/[”“](?=(?:[dmst]|ll|ve)\b(?!-))(?<=\w)/g, '’')
.replace(/‘((?:[Ii]t|[Yy]ou|[Ss]?[Hh]e|[Ww]e|[Tt]hey)(?=’[lv])|(?:If )?I)’(ll|ve|m)\b/g, (l, j,i) => `‘${j} ${{'m':'am','ll':'will'}[i]||'have'}`)
//↑
	
//↓↓↓↓quotation marks => DOUBLE PRIME 
.replace(/“(?<=\b(?:the|and) “)([\s\-\w’]+)([\!])?”/g, '″$1″$2')
.replace(/[”“\"](?<=\w .)(\w+|[\?\!])(\.)?[”\"]/g, '″$1″$2')
.replace(/[“\"](?<=\w .)(\S+(?:\s+\S+){1,3})[\"”](?= [a-z])/g, '″$1″')
.replace(/“(?<=[a-z] “)([a-z]+\s[a-z]+)”(?= [A-Za-z])/g, '″$1″')
.replace(/(“\S[^\"”“<]+\s)“([\s\w’]+)”(?=\W[^\"”“<]*?”)/g, '$1″$2″')
.replace(/[“\"](?<=[a-z] [“\"])([a-z\s’]+(?<!’))[”\"]/g, '″$1″')
.replace(/\"(?<=\b(?:or|as?|the|to) \")([A-Za-z’\s]+)\"/g, '″$1″')
//<p>The “ab bb” is fake.</p>
//“I saw the “Ack Bac aa”, it's great
//Go in "place" and...
//DOESNT WORK //<p>"It is so", Aina said, "he did say: "I didnt do it." to me."</p>
//Anastasia sneered; "Weren’t you busy "Crafting"?"
//“The move Heaven Defying "Wu Ji" has been.."
///↑↑↑↑
////↓↓↓↓↓ — 
.replace(/(?:‘|’(?<=[^\.,\?!…]’)(?![a-z]*\s|[a-z]\b))([^\"”“\'’‘\<]+)(?:(?<!\s)‘|’(?![a-z]))/g, '‘$1’')//test-strings: ``Can’t u do the ’job’?``|||``‘We don’t!’ said the Merfolks’ people``||| jsfiddle.net/5gLfanov
.replace(/”\b(?<![\s\>\,]”)/g, '” ')// \b => (?=\w)
.replace(/““[^“”\"]+””/g, '×÷×$&')
.replace(/”(?<=(?:<p>|, |”|\: ?|\. )”)/g, '“')
.replace(/[“‘](?=(?:<\/[^>]+>\s*)*<(?:\/p>|br>\s*<br>))/g, a => a==='“'?'”':'’')
.replace(/’(?<=(?:<p>|, )(?:<[^>]+>)*’)/g, '‘')
.replace(/’(?=\w\w\w+)(?<![\s\w]’)/g, '’ ')
//.replace(/(?: ([\”’])|([\“‘]) )/g, '$1$2')
.replace(/([\?\!\.\…]+)(?<=\w\1)(?=[\"”“][\"”“](?<!\"\")\w)/g, '$1∆∆')
.replace(/∆∆[\"”“][\"”“]/g, '” “')
.replace(/[\"”“][\"”“](?<!\"\"|”“)/g, '\"')
.replace(/“(?<![\s\[\『\「\>\‘\']“)/g, ' “')
.replace(/(“[^\"”“<>\—\–]+[\—\–]) \“(?=\S)/, '$1” ')
.replace(/×÷×[“”\"]+([^”“\"<]+)[”“\"\s]+/g, '““$1””')
//↓simulation to check the pairs
.replace(/<(?=\/?(?:p|div|h[1-9r]|br>\s*<br)(?: [^>]+)?>)/g, '𛖠<')//\u1b5a0
.replace(/=\"([^\"]+)\"(?=[> ])/g, '=÷°÷\'$1÷°÷\'')
.replace(/([\"“”](?!\s?[\"“”])[^\"“”𛖠]+[\"”])/g, '∅¢$1∅¢')
.replace(/∅¢[\"“”]\s/g, ' \“')
.replace(/\"∅¢(?=[A-Za-z])/g, '$& ')
.replace(/, \.∅¢\s*/g, '∅¢')
.replace(/÷°÷\'/g, '\"')
.replace(/∅¢/g, '')
.replace(/𛖠/g, '')
//↑
.replace(/”\b(?<![\>\,]”)/g, '” ')// \b => (?=\w)
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
.replace(/ (?!\?\?\?)([\!\?]+)(?<=\w+(?<!\ba|\bthe|:) \1)\.?/g, '$1')
.replace(/([‘\']\w+)\.([’\'])(?<=\s\1\..)/g, '$1$2.')
.replace(/’ (?<= o’ )/g, '’')
.replace(/[”\"?!]<\/(?:em|i)>(?=[^\W_])/g, '$& ')
//↑↑↑
//↓↓↓↓↓↓ — italics
.replace(/(<\/?)(em|i)>/g, (_, a,l) => `${a}${l=='i'?'♠':'♠♠'}>`)
.replace(/(♠+)><(♠+)>(?<!\1>)([^]+?)<\/\2><\/\1>/g, '♠♠>$3</♠♠>')
.replace(/<(♠+)>(?:[^](?![/<]\1>|<\/?p>))+?<\/\1>(?:(?:<(?!\/?p>|\/\1>)[^>]+>|\s)*<\1>(?:[^](?![/<]\1>|<\/?p>))+?<\/\1>)+/g, _ => `${_.replace(/<\/♠+>([^]*?)<♠+>/g, '$1')}`)//clog
.replace(/(<\/♠+>\s*(?:<[^>]+>)*)([\!\?]+|[\;\.\:\,])/g, '$2$1')
.replace(/(♠+(?<=\/♠+)>(?:<[^>]+>)*)\s+(?!<\/p>)/g, '$1  ')//n+h space > normal space
.replace(/([”\"]\.?(?=<)|<♠+>)([“\"]|<\/♠+>)/g, '$2$1')
.replace(/([“\"])(<♠+>)([^♠\/]+)(<\/♠+>)([”\"])(\s+)?/g, (_, a1,a2,a3,a4,a5,b) => `${a2}${a1}${a3}${a5}${a4}${b?'  ':''}`)
.replace(/[’‘](<♠+>)(?=[^♠<]+?[”’][^\w<]*<\/♠+>)/g, '$1‘')
.replace(/“(<♠+>)(?=[^♠<]+?[”’][^\w<]*<\/♠+>)/g, '$1“')
.replace(/(♠+(?<=[\!\?\;\.\,]<\/♠+)>)\s*(?=[”’\]\"])/g, '$1 ')//hair space
.replace(/♠+(?<=\/♠+)>(?=[\"”’\'])/g, '$& ')//u200a
.replace(/♠+>/g, m => m == '♠>'?'i>':'em>')
//↑↑↑↑↑↑
.replace(/:(?![\s\d\/]|<\/p>)(?<=\w\:)/g, ': ')
////↓↓↓↓↓
//’d => had
.replace(/’d\b(?<=\b[A-Za-z][a-z]*’d)\s(?=\W?(?:(?:only|each|n?ever|maybe)\s)?(?:(?:[a-z]{3}[a-z]+?ly\b|all|almost|already|also|always|both|eve[nr]|first|half|just|kinda|just|long|last|never|no[wt]|once|often|still|since|somehow|then|truly|at least|long since|kind of|so easily|more or less)\s)?(?:half-)?(?:[a-z]+?ed(?<!(?:e|\b[^])ed)|agreed|awoken|a?risen|abone|b?eaten|[bs]een|begun|[bt]orne?|[bl]ent|[bf]ound|[bl]it|[bhr]idden|bitten|[bf]lown|broken?|br?ought|backslid|built|burnt|[ct]aught|chidden|clad|chosen|[cf]lung|crept|[dg]one|dug|disproven|drawn|[dhr]ove|dreamt|dr[au]nk|dealt|durst|dwelt|driven|[fl]ed|fallen|felt|[fs]ought|for(?:bidden|seen|gotten|given|egone|esawn|eseen|etold|saken)|freed|frozen|got|gotten|[gr]iven|grown|had|handwritten|hewn|heard|held|knelt|[kw]ept|known|inlaid|interwoven|interwound|[lps]aid|left|lost|leapt|lear?nt|made|meant|met|mis(?:dealt|done|heard|laid|lear?nt|laden|spe[ln]t|spoken|taken|taught|understood|written)|mown|overheard|overseen|partaken|proven|s[ae]wn|[st]old|sp?ent|shaken|strode|[st]hriven|smitten|shone|sho[dt]|sh?own|shrunk|s[mp]elt|strewn|s[pt]rung|stricken|stri[dv]+en|snuck|s?lain|shaven|s[hw]orn|slid|slung|spoken|spo?ilt|spun|sp?at|stood|stolen|str?uck|st?un[gk]|shat|stript|slunk|s[lw]ept|swum|swung|taken|trod|thought|thrown|understood|wo[kv]en|w?rung|won|written|worn)\b)/g, ' had ')
.replace(/’d\b(?<=\b[A-Za-z][a-z]*’d)\s(?=\W?(?:(?:[a-z]{3}[a-z]+?ly\b|all|almost|already|also|always|both|eve[nr]|first|half|just|kinda|long|last|never|no[wt]|once|often|still|since|somehow|then|truly|at least|long since|kind of|so easily)\s)?(?:(?:not\s)?had\s))/g, ' had ')

.replace(/’d\s(?=(?:(?:previously|recently)\s|(?<=\b(?:[Ee]ver since|looked like|[Ss]ince then,?|\b[Ii]f) [A-Za-z][a-z]*’d.)|(?=[a-z]+ before[\.,]|[a-z]+ had\b))(?:become|bet|come|cast|cost|cut|hit|hurt|let|put|quit|read|run|set|shut|spread)\b)/g, ' had ')

.replace(/’d\s(?=(?:(?:soon)\s)(?:become|bet|come|cast|cost|cut|hit|hurt|let|put|quit|read|run|set|shut|spread)\b)/g, ' would ')

//’s => has
.replace(/’s\b(?<=\b[A-Za-z][a-z]*’s)\s(?=\W?(?:(?:[a-z]{3}[a-z]+?ly\b(?<!\b(?:assemb|anoma|amphibo|alderf|acromega|anencepha|acrocepha|antic|acepha|adacty|adenomega|blowf|biweek|brol|botf|bimonth|butterf|blackf|brachycepha|brachydacty|blol|bobf|bullf|come|contume|catchf|cardiomega|cice|caval|clouter|clinocepha|chalcidf|clinodacty|caraco|capercal|caustici|dayf|didd|dragonf|dayli|disassemb|damself|dobsonf|dolichocepha|deaf|dactylomega|dulwil|dorrf|dividing|elder|embo|epibo|evange|ectrodacty|fami|firef|gadf|grizz|greenf|gallf|grayf|gorf|glossola|horsef|housef|hillbil|hepatomega|hydrocepha|hyperdacty|hemimetabo|holometabo|homophy|heterometabo|hankering|histophy|hyperdu|imperial|loblol|logodaeda|mayf|monopo|month|melancho|medf|megacepha|microcepha|macrocepha|megalocepha|macrencepha|mesal|morphophy|mingled|norther|nebu|nanocepha|nemophi|oversupp|oligopo|oxycepha|organophy|panop|philate|potbel|patchou|plagiocepha|polydacty|piccadil|puffing|pasila|perce|physiophy|quarter|quai|quirboil|reassemb|redbel|rockabil|rainf|sawf|sing|supp|sordid|subfami|semimonth|semiweek|skil|sandf|superfami|stonef|shadf|sowbel|shoof|shillyshal|scaphocepha|syndacty|splenomega|skel|schel|snakef|spongef|spongillaf|shee|scho|sawbel|siker|twil|trol|trifo|triweek|thyromega|towil|underbel|vermi|vigi|wool|week|whitef|whitebel|zoophi)ly)|all|almost|already|also|always|both|eve[nr]|first|half|just|kinda|long|last|never|no[wt]|once|often|still|since|somehow|then|truly|at least|long since|kind of|so easily|more or less)\s)?(?:existed|happened|remained|been|become|began|got|had)\b(?=\s))/g, ' has ')
.replace(/’s\b(?<=\b[A-Za-z][a-z]*’s)\s(?=\W?(?:(?:never)\s)?(?:[a-z]+?ed(?<!(?:e|\b[^])ed)|agreed|awoken|a?risen|abone|b?eaten|[bs]een|begun|[bt]orne?|[bl]ent|[bf]ound|[bl]it|[bhr]idden|bitten|[bf]lown|broken?|br?ought|backslid|built|burnt|[ct]aught|chidden|clad|chosen|[cf]lung|crept|[dg]one|dug|disproven|drawn|[dhr]ove|dreamt|dr[au]nk|dealt|durst|dwelt|driven|[fl]ed|fallen|felt|[fs]ought|for(?:bidden|seen|gotten|given|egone|esawn|eseen|etold|saken)|freed|frozen|got|gotten|[gr]iven|grown|had|handwritten|hewn|heard|held|knelt|[kw]ept|known|inlaid|interwoven|interwound|[lps]aid|left|lost|leapt|lear?nt|made|meant|met|mis(?:dealt|done|heard|laid|lear?nt|laden|spe[ln]t|spoken|taken|taught|understood|written)|mown|overheard|overseen|partaken|proven|put|s[ae]wn|[st]old|sp?ent|shaken|strode|[st]hriven|smitten|shone|sho[dt]|sh?own|shrunk|s[mp]elt|strewn|s[pt]rung|stricken|stri[dv]+en|snuck|s?lain|shaven|s[hw]orn|slid|slung|spoken|spo?ilt|spun|sp?at|stood|stolen|str?uck|st?un[gk]|shat|stript|slunk|s[lw]ept|swum|swung|taken|trod|thought|thrown|understood|wo[kv]en|w?rung|won|written|worn)\s(?:me|them|us|her|hi[ms]|its?|my|your|our)\b)/g, ' has ')//no 'their'  –  no 'become/put/cut/ etc'
//||has given us –
////↑↑↑↑↑ — regex101.com/r/h1H0nh
//↓↓↓ — 
.replace(/([\[\(])\s/g, '$1')
.replace(/[\]\)](?=\w\w)/g, '$& ')
//↑↑↑
.replace(/\\u003[ec]/g, _ => /c/.test(_)?'&lt;':'&gt;')
.replace(/ça(?<=\bfaça)de/g, 'cade')
.replace(/ïve(?<=\bnaïve)/g, 'ive')
.replace(/-(?<=\b[A-Z]\-)(?:Class|Rank|Cup|Shirt|Plan|Grade|Spot)/g, _ => _.toLowerCase())
//↓↓↓↓↓ \w to avoid "A grade" at the start of a phrase. Not applied to the beginning of phrases on purpose, even for B or C grade etc..
//↑↑↑↑↑

.replace(/(?:[\,\?\!]+|\.+(?!(?:com|it|net|jpg|png|html)\b))(?=[A-Za-z])(?<=\b(?!www\.)\w\w+[\,\?\!\.]+)/g, '$& ')
.replace(/—(?<=\w—)(?=\w)/g, ' — ')//sixth spaces
.replace(/\.([Mm])\.,(?<=[AaPp]\.[Mm]\.,)/g, '$1,')//5 a.m.,
.replace(/([\?!\.…][”“’\"])\.<(?<![”“\"‘]\1\.<)/g, '$1<')
.replace(/(![”’\"])\.(?<=<p>[“‘\"][^”“\"\/]*?\!.\.)<\/p>/g, '$1</p>')
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
.replace(/([\"”“](?<=<p>.)[\w’]+(?:\s[\w’]+){0,2}[\!\?\…\.]*)(?=<\/p>)/g, '$1”')
.replace(/<p>(?=[\w’]+(?:\s[\w’]+){0,2}[\!\?\…\.]*[\"”“]<\/p>)/g, '<p>“')
.replace(/<p>(?=[A-Za-z’]+[\s,][a-zA-Z\s’]+[\.\!\…\?]*”)/g, '<p>“')
.replace(/“(?<=<p>“)((?:\s?[A-Za-z’]+){1,6}[\!\…\?\.]+)(?=<\/p>)/g, '“$1”')
//test: ||<p>“Mm, kakaa!" Bob nodded. “Bla bla’s. Blabla…”||
//↑↑↑
//↓ misc
.replace(/\.(?:(?<=Ph.)\s(?=D\.))/g, '.')//dot space fix
.replace(/:\/\/(?<=\bhttp(s)?:..)(?:[^<\s]+\s(?<=[\?\.].)(?!<))+/g, (_, a) => `${a?'':'s'}${_.replace(/\s/g, '')}`)//incorrect spacing
.replace(/\/p>(?=[^<♪]+<)/g, '/p><p>')//give p to tagless
.replace(/-\b(?![^<]+?>)(?<!<[^>]+?-)(?<=\b\w{1,3}(?:-|\w-(?=\w{1,3}\b)))/g, '-⁠')//u2060 hypen
.replace(/\.(?<=\b(?:M[sr]s?|etc)\.)(?=[ ,])/g, '<span style="font-size: 0.81em;">.</span>')
//↑
//↓↓↓↓↓↓↓ thousands separator— n ≤9999 excluded—
.replace(/,(?=\d\d\d\D)/g, '±±')
.replace(/±±(?<=\b\d\d?±±)(?=\d\d\d[^±])/g, '')
.replace(/±±(?<=\d±±)/g, '<span style="font-size: 0.8em;">,</span>')
//↑↑↑↑↑↑↑ alternative separators:
//100𝃳000//100༌000//100˙000//100𑀀000//100ॱ000//100ᱸ000//100ʹ000//100՛000
//place images
.replace(/䷢䷢䷢(\d+)/g, (_, a) => imgs[parseInt(a)-1])

.replace(/[\u00a0]/g, '&nbsp;')
.replace(/♪/, '')
.replace(/\bLorem ipsum dolor( sit amet consectetuer adipiscing[^]{1,6}?elit)?/g, '🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴')
//↑ — 0

//%%%%%%%%%—My JS 

//%%%%%%%%%
;



