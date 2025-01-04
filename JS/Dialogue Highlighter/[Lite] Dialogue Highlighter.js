//Cleaning of quotation marks contexts
////↓↓↓↓↓ — 
chapter = document.querySelector('#LNReader-chapter');
chapter.innerHTML = chapter.innerHTML
.replace(/(?:‘|’(?<=\W’)(?!s?\s))([^\"”“\'’‘\<]+)(?:(?<!\s)‘|’(?![a-z]))/g, '‘$1’')//test-strings: ``Can’t u do the ’job’?``|||``‘He said ‘something’!’``|||``‘We don’t!’ They said on the Merfolk Pirates’ deck.``|||
.replace(/”(?<=(?:<p>|\: ?)”)/g, '“')
.replace(/[“‘](?=<\/p>)/g, (a) => a === '“'?'”':'’')
.replace(/’(?<=<p>’)/g, '‘')
.replace(/’(?=\w\w\w+)(?<![\s\w]’)/g, '’ ')
.replace(/(?: ([\”’])|([\“‘]) )/g, '$1$2')

///////↓↓↓↓ — Dialogue highlighter
const regex = /[\"“”](?<!\=\")(?!>|\s?[\"“”])([^\"“”]+?)(<br>[^\"“”]+)?[\"”](?<!=\")/g;
const colorElement = (x) => {
    x.innerHTML = x.innerHTML
	.replace(/=\"/g, '=\'')
        .replace(/\"(?=>| [a-z\-]+=\")/g, '\'')
	.replace(regex, `"<span style="color: #FFFFEB;">$1$2</span>"`);
};
(col = (parent) => {
    if (parent.nodeName === "SCRIPT") return;
    const childsWith = [...parent.children].filter((ch) =>
        /[\"“”]/.exec(ch.innerText)
    );
    if (!childsWith.length) colorElement(parent);
    else childsWith.forEach((ch) => col(ch));
})(document.querySelector('#LNReader-chapter'));
//////↑↑↑↑ — END
