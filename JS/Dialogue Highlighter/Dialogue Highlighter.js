//Cleaning of quotation marks contexts
//↓↓↓↓quotation marks => DOUBLE PRIME 
chapter = document.querySelector('#LNReader-chapter');
chapter.innerHTML = chapter.innerHTML
.replace(/“(?<=\bthe “)([\s\-\w’]+)([\!])?”/g, '″$1″$2')
.replace(/[”“\"](?<=\b\w+ [“”\"])(\w+|[\?\!])[”\"]/g, '″$1″')
.replace(/“(?<=\b\w+ “)(\w+\s\w+)”(?= [a-z])/g, '″$1″')
.replace(/“(?<=\b[a-z]+ “)([a-z]+\s[a-z]+)”(?= [A-Za-z])/g, '″$1″')
.replace(/(“\S[^\"”“<]+\s)“([\s\w’]+)”(?=\W[^\"”“<]*?”)/g, '$1″$2″')
.replace(/[“\"](?<=\b[a-z]+ [“\"])([a-z\s’]+(?<!’))[”\"]/g, '″$1″')
.replace(/\"(?<=\b(?:or|as?|the|to) \")([A-Za-z’\s]+)\"/g, '″$1″')
///↑↑↑↑
////↓↓↓↓↓ — 
.replace(/(?:‘|’(?<=\W’)(?!s?\s))([^\"”“\'’‘\<]+)(?:(?<!\s)‘|’(?![a-z]))/g, '‘$1’')//test-strings: ``Can’t u do the ’job’?``|||``‘He said ‘something’!’``|||``‘We don’t!’ They said on the Merfolk Pirates’ deck.``|||
.replace(/”(?=\w)(?<=[^\s\>\,]”)/g, '” ')
.replace(/”(?<=(?:<p>|, |”|\: ?|\. |–|[^>]“[^”–—]+[–—])”)/g, '“')
.replace(/[“‘](?=<\/p>)/g, (a) => a === '“' ? '”' : '’' )
.replace(/’(?<=(?:<p>|, )’)/g, '‘')
.replace(/’(?=\w\w\w+)(?<![\s\w]’)/g, '’ ')
.replace(/[\"“](?<=<p>[\"“])[\"”“]/g, '“')
.replace(/([\?\!\.\…]+)(?<=\w+\1)(?=[\"”“][\"”“](?<!\"\")\w)/g, '$1∆∆')
.replace(/∆∆([\"”“])([\"”“])/g, '$1 $2')
.replace(/[\"”“][\"”“](?<!\"\")/g, '\"')
.replace(/“(?<=[^\s\[\『\「\>]“)/g, ' “')
.replace(/(“[^\"”“<>\—\–]+[\—\–]) \“(?=\S)/, '$1” ')
//↓simulation to check the pairs
.replace(/([\"“”](?<!\=\")(?!>|\s?[\"“”]|<\/| [a-z\-]+=\")(?:<?[^\"“”<]+?(?:<[^\"“”<]+?)?)(?:<br>[^\"“”<]+)?([\"”]|“(?=\S)))/g, '∅¢$1∅¢')
.replace(/∅¢[\"“”](\,)?\s/g, '$1 \“')
.replace(/(\"∅¢)(?=[A-Za-z])/g, '$1 ')
.replace(/, \.∅¢\s*/g, '∅¢')
.replace(/∅¢/g, '')
//↑
.replace(/”(?=\w)(?<=[^\>\,]”)/g, '” ')
////↑↑↑↑↑

///////↓↓↓↓ — Dialogue highlighter
const regex = /[\"“”](?<!\=\")(?!>|\s?[\"“”])([^\"“”]+?)(<br>(?!\s*<br>)[^\"“”]+)?[\"”](?<!=\")/g;
const colorElement = (x) => {
    x.innerHTML = x.innerHTML
	.replace(/=\"/g, '=\'')
        .replace(/\"(?=>| [a-z\-]+=\")/g, '\'')
	.replace(regex, `"<span style="color: #FFFFEB;">$1$2</span>"`)
	.replace(/[\u2033]/g, '\"');
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
