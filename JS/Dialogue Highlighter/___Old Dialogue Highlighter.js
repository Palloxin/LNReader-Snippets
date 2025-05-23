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

//OLD because it's slower, a lot.
