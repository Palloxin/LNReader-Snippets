chapter = document.querySelector('chapter');
chapter.innerHTML = chapter.innerHTML
.replace(/(?<=\<\/(?:p|h[1-5]|br)>)(?!\n|\s*<p>\s*<\/p>|\s*<(?:br|h[1-5])>)/g, '\n')
chapter.innerText = chapter.outerHTML
