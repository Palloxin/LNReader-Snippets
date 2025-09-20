chapter = document.querySelector('#LNReader-chapter');
chapter.innerHTML = chapter.innerHTML
.replace(/&nbsp;/g, '\u00a0')
.replace(/<p>\s*<\/p>/g, '')
.replace(/<p>\s*(?:<\w+>\s*)*Translator:[^\w<]*(?:<\/?\w+>\s*)*(?:\w[\w’\s\-]+\.?)[^\w<]*(?:<\/?\w+>\s*)*Editor:[^\w<]*(?:<\/?\w+>\s*)*(?:\w[\w’\s\-]+\.?)(?:<\/?\w+>\s*)*(?<!\s*<p>)<\/p>/, '')
.replace(/[\u00a0]/g, '&nbsp;')
// - https://jsfiddle.net/yau30t8m/

