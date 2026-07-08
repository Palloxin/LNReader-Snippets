//Cleaning of quotation marks contexts
////↓↓↓↓↓ — 
chapter = document.querySelector('#LNReader-chapter');
chapter.innerHTML = chapter.innerHTML
.replace(/(?:‘|’(?<![\.,\?!…]’)(?![a-z]*\s))([^\"”“\'’‘\<]+)(?:(?<!\s)‘|’(?![a-z]))/g, '‘$1’')//test-strings: ``Can’t u do the ’job’?``|||``‘He said ‘something’!’``|||``‘We don’t!’ They said on the Merfolk Pirates’ deck.``|||
.replace(/”(?<=(?:<p>|\: ?)”)/g, '“')
.replace(/[“‘](?=(?:<\/[^>]+>\s*)*<(?:\/p>|br>\s*<br>))/g, a => a==='“'?'”':'’')
.replace(/’(?<=<p>(?:<[^>]+>)*’)/g, '‘')
.replace(/’(?=\w\w\w+)(?<![\s\w]’)/g, '’ ')
.replace(/(?: ([\”’])|([\“‘]) )/g, '$1$2')

///////↓↓↓↓ — Dialogue highlighter
chapter = document.querySelector('#LNReader-chapter');
chapter.innerHTML = chapter.innerHTML
.replace(/<(?=\/?(?:p|div|h[1-9r]|br>\s*<br)[> ])/g, '𛖠<')//\u1b5a0
.replace(/=\"([^\"]+)\"(?=[> ])/g, '=÷°÷\'$1÷°÷\'')
.replace(/[\"“”](?!\s?[\"“”])[^\"“”𛖠]+[\"”]/g, _ => `${/^[^<]*<\/[^>]+>|<[^\/!][^>]+>[^<]*$/.test(_)?'∆∆'.concat(_).replace(/[\"”“](?=[^<]+<\/([^>]+)>)/, '\"¶×¶</$1>').replace(/(<([^!\/\s>]+)(?:>| [^>]+>))([^<\"”]+)?(?=[\"”]$)/, (_, a,b,c) => `${c?a:''}${c||''}${c?'</'+ b + '>':''}"${a}`):_.replace(/.([^]+).$/, `"<ww>$1<\/ww>⁠"`)}`)//u2060
.replace(/¶×¶<\/([^>]+)>(?<=(<\1(?:>| [^>]+>))[^𛖠¶]+¶×¶<[^>]+>)/g, '</$1>$2')// finalize closing front open tag
.replace(/∆∆[\"“”]((?:\s*<\/[^>]+>)+)?([^\"“”𛖠]+)(?:"(<[^\/!][^>]+>))?[\"”]/g, `"$1<span style=÷°÷\'color: #FFFFEB÷°÷\'>$2<\/span>$3\u2060"`)//u2060
.replace(/“\"⁠<([^”“\"]+)\"”/g, '““⁠<$1””')
.replace(/[\u2033]/g, '\"')
.replace(/÷°÷\'/g, '\"')
.replace(/𛖠/g, '');
//////↑↑↑↑ — END
