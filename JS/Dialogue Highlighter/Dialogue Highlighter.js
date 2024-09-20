//Cleaning of quotation marks contexts
//↓↓↓↓quotation marks => DOUBLE PRIME 
chapter = document.querySelector('chapter');
chapter.innerHTML = chapter.innerHTML
.replace(/“(?<=\bthe “)([\s\-\w’]+)([\!])?”/g, '″$1″$2')
.replace(/“(?<=(?:\b\w+? |<p>(?!“\w+”[\.\,\<]))“)(\w+)”/g, '″$1″')
.replace(/“(?<=\b\w+ “)(\w+\s\w+)”(?= [a-z])/g, '″$1″')
.replace(/“(?<=\b[a-z]+ “)([a-z]+\s[a-z]+)”(?= [A-Za-z])/g, '″$1″')
.replace(/(“\S[^\"”“<]+\s)“([\s\w’]+)”(?=\W[^\"”“<]*?”)/g, '$1″$2″$3')
.replace(/″([^″]+)″/g, '\″$1″')//hair spaces + \u2060(avoid break)
//<p>The “seriously injured” is fake.</p>
//“I saw the “Four Spirits body”, it's great”
//↑↑↑↑
////↓↓↓↓↓ — 
.replace(/(?:‘|’(?<=\W’)(?!s?\s))([^\"”“\'’‘\<]+)(?:(?<!\s)‘|’(?![a-z]))/g, '‘$1’')//test-strings: ``Can’t u do the ’job’?``|||``‘He said ‘something’!’``|||``‘We don’t!’ They said on the Merfolk Pirates’deck.``|||
.replace(/”(?<=[^\s\>\,]”)(?=\w)/g, '” ')
.replace(/”(?<=(?:<p>|, |”|\: ?|\. |–|—)”)/g, '“')
.replace(/“(?=<\/p>)/g, '”')
.replace(/’(?<=(?:<p>|, )’)/g, '‘')
.replace(/‘(?:<\/p>)/g, '’')
.replace(/’(?<![\s\w]’)(?=\w\w\w+)/g, '’ ')
.replace(/(?<=<p>|\: )[\"“][\"”“]/g, '“')
.replace(/(?: ([\”’])|([\“‘]) )/g, '$1$2')
.replace(/(?<=\w+[\?\!\.\…]+)((?!\"\")[\"”“][\"”“])(?=\w)/g, '∆∆$1')
.replace(/∆∆([\"”“])([\"”“])/g, '$1 $2')
.replace(/(?!\"\")[\"”“][\"”“]/g, '\"')
.replace(/“(?<=[^\s\>]“)/g, ' “')
.replace(/(“[^\"”“<>\—\–]+[\—\–]) \“(?=\S)/, '$1” ')
//↓simulation to check the pairs
.replace(/([\"“”](?<!\=\")(?! offline\=\")(?:[^\"“”<]+?)(?:<br>[^\"“”<]+)?([\"”]|“(?=\S)))/g, '∅¢$1∅¢')
.replace(/∅¢[\"“”](\,)?\s/g, '$1 \“')
.replace(/(?<=\"∅¢)(?=[A-Za-z])/g, ' ')
.replace(/\s(?<=[^\,]\s)[\"“”]∅¢/g, '\” ')
.replace(/∅¢/g, '')
//↑
.replace(/”(?<=[^\>\,]”)(?=\w)/g, '” ')

///////↓↓↓↓ — Dialogue highlighter
const regex = /[\"“”](?<!\=\")(?!>|\s?[\"“”])([^\"“”]+?)(<br>[^\"“”]+)?[\"”](?<!=\")/g;
const colorElement = (x) => {
 x.innerHTML = x.innerHTML.replace(regex, 
`"<span style="color: #FFFFEB;">$1$2</span>"`
);
};
(col = (parent) => {
 if (parent.nodeName === "SCRIPT") return;
 const childsWith = [...parent.children].filter((ch) =>
 /[\"“”]/.exec(ch.innerText)
 );
 if (!childsWith.length) colorElement(parent);
 else childsWith.forEach((ch) => col(ch));
})(document.querySelector("chapter"));
///////↑↑↑↑ — END
