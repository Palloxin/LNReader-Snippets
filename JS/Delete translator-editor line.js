chapter = document.querySelector('#LNReader-chapter');
chapter.innerHTML = chapter.innerHTML
.replace(/<p>\s*(<\w+>\s*)*Translator:[^\w<]*(<\/?\w+>\s*)*(?:\w[\w’\s]+\.?)[^\w<]*(<\/?\w+>\s*)*Editor:[^\w<]*(<\/?\w+>\s*)*(?:\w[\w’\s]+\.?)(<\/?\w+>\s*)*(?<!\s*<p>)<\/p>/, '');