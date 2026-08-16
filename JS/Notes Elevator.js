chapter = document.querySelector('#LNReader-chapter');
chapter.innerHTML = chapter.innerHTML

.replace(/[^]+/, _ => _.replace(/\[(?<!>.)([1234])\]/g, '<a id="telep$1" href="#bottm" style="pointer-events: auto; color: var(--theme-primary) !important" onclick="event.stopPropagation()">$&</a>')
.replace(/$/, I => {return [..._.matchAll(/\[(?<!>.)([1234])\]/g)].map(i => `<p id=\"bottm\"><a href=\"#telep${i[1]}\" style=\"pointer-events: auto; color: var(--theme-primary) !important\" onclick=\"event.stopPropagation()\">\[${i[1]}\]↑</a>`).join(' ');})) 
