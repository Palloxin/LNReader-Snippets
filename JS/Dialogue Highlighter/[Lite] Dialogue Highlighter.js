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
.replace(/<\/?(?:p|div|h[1-9r]|br>\s*<br)>/g, '𛖠$&')//\u1b5a0
.replace(/=\"([^\"]+)\"(?=[> ])/g, '=\'$1\'')
.replace(/[\"“”](?<!\=\")(?!>|\s?[\"“”]| [a-z\-]+=\"|<ww)([^\"“”𛖠]+?)(<br>[^\"“”'𛖠]+)?[\"”](?<!=\"| [a-z\-]+=\"|ww>\")(?![^𛖠]+<(?:p|div|h[1-9]|br>\s*<br)>)/g, `"⁠<ww>$1$2</ww>⁠"`)//2060
.replace(/[\u2033]/g, '\"')
.replace(/𛖠/g, '');
//////↑↑↑↑ — END
