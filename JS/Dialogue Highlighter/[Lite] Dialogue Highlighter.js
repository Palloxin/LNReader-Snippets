//Cleaning of quotation marks contexts
////↓↓↓↓↓ — 
chapter = document.querySelector('#LNReader-chapter');
chapter.innerHTML = chapter.innerHTML
.replace(/(?:‘|’(?<![\.,\?!…]’)(?![a-z]*\s))([^\"”“\'’‘\<]+)(?:(?<!\s)‘|’(?![a-z]))/g, '‘$1’')//test-strings: ``Can’t u do the ’job’?``|||``‘He said ‘something’!’``|||``‘We don’t!’ They said on the Merfolk Pirates’ deck.``|||
.replace(/”(?<=(?:<p>|\: ?)”)/g, '“')
.replace(/[“‘](?=<\/p>)/g, a => a === '“'?'”':'’')
.replace(/’(?<=<p>’)/g, '‘')
.replace(/’(?=\w\w\w+)(?<![\s\w]’)/g, '’ ')
.replace(/(?: ([\”’])|([\“‘]) )/g, '$1$2')

///////↓↓↓↓ — Dialogue highlighter
chapter = document.querySelector('#LNReader-chapter');
chapter.innerHTML = chapter.innerHTML
.replace(/<\/?(?:p|div|h[1-9r]|br>\s*<br)(?:>| [^>]+>)/g, '𛖠$&')//\u1b5a0
.replace(/=\"([^\"]+)\"(?=[> ])/g, '=÷°÷\'$1÷°÷\'')
.replace(/[\"“”](?!\s?[\"“”])[^\"“”𛖠]+[\"”](?<!ww>\")/g, _ => `∆∆${_.replace(/(<[^\/!][^>]*>)([^<\"”]*[\"”])/, '$2¶¶$1')}`)//move open tag near end of dialogue
.replace(/∆∆[\"“”](?!\s?[\"“”]|<ww)((?:\s*<\/[^>]+>)+)?([^\"“”𛖠]+)[\"”](?<!ww>\")(?:¶¶(<[^>]+>))?/g, `"$1<ww>$2<\/ww>$3⁠"`)//2060
.replace(/÷°÷'/g, '\"')
.replace(/𛖠/g, '');
//////↑↑↑↑ — END
