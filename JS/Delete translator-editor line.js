chapter = document.querySelector('#LNReader-chapter');
chapter.innerHTML = chapter.innerHTML
.replace(/&nbsp;/g, '\u00a0')
.replace(/<p>\s*<\/p>/g, '')
.replace(/^(?:.*?<p>.+?<\/p>){4}/, (_) => `${_.replace(/<p>\s*(?:<\w+>\s*)*Translator:[^\w<]*(?:<\/?\w+>\s*)*(?:\w[\w’\s]+\.?)[^\w<]*(?:<\/?\w+>\s*)*Editor:[^\w<]*(?:<\/?\w+>\s*)*(?:\w[\w’\s]+\.?)(?:<\/?\w+>\s*)*(?<!\s*<p>)<\/p>/, '')}`)
