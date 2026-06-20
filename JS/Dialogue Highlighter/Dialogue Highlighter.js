//Cleaning of quotation marks contexts
chapter = document.querySelector('#LNReader-chapter');
chapter.innerHTML = chapter.innerHTML
.replace(/(?:<span>(?:[^<]*<(?!(?:span|\/?p)>))+\/span>(?:[^<]*<(?!\/?(?:p|span)>)[^>]+>)*){2,}/g, _ => `${_.replace(/<\/span>(.*?)<span>/g, '$1')}`)//span clog - https://jsbench.me/w0m9jpmj80
  
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
.replace(/<(?=\/?(?:p|div|h[1-9r]|br>\s*<br)(?:>| [^>]+>))/g, '𛖠<')//\u1b5a0
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
////↑↑↑↑↑

///////↓↓↓↓ — Dialogue highlighter
chapter = document.querySelector('#LNReader-chapter');
chapter.innerHTML = chapter.innerHTML
.replace(/<(?=\/?(?:p|div|h[1-9r]|br>\s*<br)[> ])/g, '𛖠<')//\u1b5a0
.replace(/=\"([^\"]+)\"(?=[> ])/g, '=÷°÷\'$1÷°÷\'')
.replace(/[\"“”](?!\s?[\"“”])[^\"“”𛖠]+[\"”]/g, _ => `${/[^<]*<\/[^>]+>|<[^\/!][^>]+>[^<]*$/.test(_)?'∆∆'.concat(_).replace(/[\"”“](?=[^<]+<\/([^>]+)>)/, '\"¶×¶</$1>').replace(/(<([^!\/\s>]+\b)[^>]*>)([^<\"”]+)?(?=[\"”]$)/, (_, a,b,c) => `${c?a:''}${c||''}${c?'</'+ b + '>':''}"${a}`):_.replace(/.([^]+).$/, `"<span style=÷°÷\'color: #FFFFEB÷°÷\'>$1<\/span>⁠"`)}`)//u2060
.replace(/¶×¶<\/([^>]+)>(?<=<(\1\b[^>]*)>[^𛖠¶]+¶×¶<[^>]+>)/g, '</$1><$2>')// finalize closing front open tag
.replace(/∆∆[\"“”]((?:\s*<\/[^>]+>)+)?([^\"“”𛖠]+)"(<[^\/!][^>]+>)?[\"”]?/g, `"$1<span style=÷°÷\'color: #FFFFEB÷°÷\'>$2<\/span>$3\u2060"`)//u2060
.replace(/“\"⁠<([^”“\"]+)\"”/g, '““⁠<$1””')
.replace(/[\u2033]/g, '\"')
.replace(/÷°÷\'/g, '\"')
.replace(/𛖠/g, '');
//////↑↑↑↑ — END - https://jsfiddle.net/L6pskwc2/2/
