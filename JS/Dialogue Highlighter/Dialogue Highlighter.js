//Cleaning of quotation marks contexts
chapter = document.querySelector('#LNReader-chapter');
chapter.innerHTML = chapter.innerHTML
.replace(/(?:<span>(?:[^<]*<(?!(?:span|\/?p)>))+\/span>(?:[^<]*<(?!\/?(?:p|span)>)[^>]+>)*){2,}/g, _ => `${_.replace(/<\/span>(.*?)<span>/g, '$1')}`)//span clog - https://jsbench.me/w0m9jpmj80
//↓↓↓↓quotation marks => DOUBLE PRIME 
.replace(/“(?<=\bthe “)([\s\-\w’]+)([\!])?”/g, '″$1″$2')
.replace(/[”“\"](?<=\w .)(\w+|[\?\!])[”\"]/g, '″$1″')
.replace(/“(?<=\w “)(\w+\s\w+)”(?= [a-z])/g, '″$1″')
.replace(/“(?<=[a-z] “)([a-z]+\s[a-z]+)”(?= [A-Za-z])/g, '″$1″')
.replace(/(“\S[^\"”“<]+\s)“([\s\w’]+)”(?=\W[^\"”“<]*?”)/g, '$1″$2″')
.replace(/[“\"](?<=[a-z] [“\"])([a-z\s’]+(?<!’))[”\"]/g, '″$1″')
.replace(/\"(?<=\b(?:or|as?|the|to) \")([A-Za-z’\s]+)\"/g, '″$1″')
///↑↑↑↑
////↓↓↓↓↓ — 
.replace(/(?:‘|’(?<![\.,\?!…]’)(?![a-z]*\s))([^\"”“\'’‘\<]+)(?:(?<!\s)‘|’(?![a-z]))/g, '‘$1’')//test-strings: ``Can’t u do the ’job’?``|||``‘He said ‘something’!’``|||``‘We don’t!’ They said on the Merfolk Pirates’ deck.``|||
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
////↑↑↑↑↑

///////↓↓↓↓ — Dialogue highlighter
chapter = document.querySelector('#LNReader-chapter');
chapter.innerHTML = chapter.innerHTML
.replace(/<\/?(?:p|div|h[1-9r]|br>\s*<br)(?:>| [^>]+>)/g, '𛖠$&')//\u1b5a0
.replace(/=\"([^\"]+)\"(?=[> ])/g, '=÷°÷\'$1÷°÷\'')
.replace(/[\"“”](?!\s?[\"“”])[^\"“”𛖠]+[\"”]/g, _ => `∆∆${_.replace(/(<[^\/!][^>]*>)([^<\"”\w]*[\"”])/, '$2¶¶$1')}`)//move open tag near end of dialogue
.replace(/∆∆[\"“”](?!\s?[\"“”])((?:\s*<\/[^>]+>)+)?([^\"“”𛖠]+)[\"”](?:¶¶(<[^>]+>))?/g, `"$1<span style=÷°÷\'color: #FFFFEB÷°÷\'>$2<\/span>$3⁠"`)//2060
.replace(/“\"⁠<([^”“\"]+)\"”/g, '““⁠<$1””')
.replace(/[\u2033]/g, '\"')
.replace(/÷°÷\'/g, '\"')
.replace(/𛖠/g, '');
//////↑↑↑↑ — END - https://jsfiddle.net/L6pskwc2/2/
