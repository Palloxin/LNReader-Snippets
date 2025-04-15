//Cleaning of quotation marks contexts
//↓↓↓↓quotation marks => DOUBLE PRIME 
chapter = document.querySelector('#LNReader-chapter');
chapter.innerHTML = chapter.innerHTML
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
.replace(/[“‘](?=<\/p>)/g, a => a === '“' ? '”' : '’' )
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
.replace(/<\/?(?:p|div|h[1-9r]|br>\s*<br)(?:>| [^<>]+>)/g, '𛖠$&')//\u1b5a0
.replace(/=\"([^\"]+)\"(?=[> ])/g, '=\'$1\'')
.replace(/([\"“”](?<!\=\")(?!>|\s?[\"“”]| [a-z\-]+=\")(?:\s*<\/[^>]+>)*([^\"“”𛖠]+?)(?:<br>[^\"“”'𛖠]+)?[\"”](?<!=\"| [a-z\-]+=\"|ww>\")(?![^𛖠]+<(?:p|div|h[1-9]|br>\s*<br)>))/g, '∅¢$1∅¢')
.replace(/∅¢[\"“”]\s/g, ' \“')
.replace(/\"∅¢(?=[A-Za-z])/g, '$& ')
.replace(/, \.∅¢\s*/g, '∅¢')
.replace(/∅¢/g, '')
.replace(/𛖠/g, '')
//↑
.replace(/”(?=\w)(?<![\>\,]”)/g, '” ')
////↑↑↑↑↑

///////↓↓↓↓ — Dialogue highlighter
chapter = document.querySelector('#LNReader-chapter');
chapter.innerHTML = chapter.innerHTML
.replace(/<\/?(?:p|div|h[1-9r]|br>\s*<br)(?:>| [^>]+>)/g, '𛖠$&')//\u1b5a0
.replace(/=\"([^\"]+)\"(?=[> ])/g, '=\'÷°÷$1÷°÷\'')
.replace(/[\"“”](?<!\=\")(?!>|\s?[\"“”]| [a-z\-]+=\")((?:\s*<\/[^>]+>)+)?([^\"“”𛖠]+?)(<br>[^\"“”'𛖠]+)?[\"”](?<!=\"| [a-z\-]+=\")(?![^𛖠]+<(?:p|div|h[1-9]|br>\s*<br)>)/g, `"⁠$1<span style='color: #FFFFEB;'>$2$3</span>⁠"`)//2060
.replace(/“\"⁠<([^”“\"]+)\"”/g, '““⁠<$1””')
.replace(/[\u2033]/g, '\"')
.replace(/÷°÷/g, '')
.replace(/𛖠/g, '');
//////↑↑↑↑ — END - https://jsfiddle.net/L6pskwc2/2/
