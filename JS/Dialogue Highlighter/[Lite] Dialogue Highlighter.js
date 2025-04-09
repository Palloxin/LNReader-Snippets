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
.replace(/=\"([^\"]+)\"(?=[> ])/g, '=\'$1\'')
.replace(/[\"“”](?<!\=\")(?!>|\s?[\"“”]| [a-z\-]+=\")((?:\s*<\/[^>]+>)+)?([^\"“”𛖠]+?)(<br>[^\"“”'𛖠]+)?[\"”](?<!=\"| [a-z\-]+=\")(?![^𛖠]+<(?:p|div|h[1-9]|br>\s*<br)>)/g, `"⁠$1<span style="color: #FFFFEB;">$2$3</span>⁠"`)//2060
.replace(/𛖠/g, '');
//////↑↑↑↑ — END
