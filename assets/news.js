

  const posts = [
	{ type:'embed', html:'<iframe src="https://www.linkedin.com/embed/feed/update/urn:li:share:7495875890917253120?collapsed=1" height="541" width="504" frameborder="0" allowfullscreen="" title="Embedded post"></iframe>', label:'doconnect - Neue Website!' },
    { type:'embed', html:'<iframe src="https://www.linkedin.com/embed/feed/update/urn:li:share:7486131309942321153?collapsed=1" height="508" width="504" frameborder="0" allowfullscreen="" title="Embedded post"></iframe>', label:'ein seiten sprung - Neue Website!' },
    { type:'embed', html:'<iframe src="https://www.linkedin.com/embed/feed/update/urn:li:share:7484010821044371458?collapsed=1" height="492" width="504" frameborder="0" allowfullscreen="" title="Embedded post"></iframe>', label:'Premiumchalet Karneralm' },
    { type:'embed', html:'<iframe src="https://www.linkedin.com/embed/feed/update/urn:li:share:7472322782048120832?collapsed=1" height="559" width="504" frameborder="0" allowfullscreen="" title="Embedded post"></iframe>', label:'Style in Progress - Are You Real?' },
    { type:'embed', html:'<iframe src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7464421848349503488?collapsed=1" height="533" width="504" frameborder="0" allowfullscreen="" title="Embedded post"></iframe>', label:'Doconnect' },
    { type:'embed', html:'<iframe src="https://www.linkedin.com/embed/feed/update/urn:li:share:7433261136034197504?collapsed=1" height="602" width="504" frameborder="0" allowfullscreen="" title="Embedded post"></iframe>', label:'Peter Frey Gallery' },
    { type:'embed', html:'<iframe src="https://www.linkedin.com/embed/feed/update/urn:li:share:7428161980349419520?collapsed=1" height="593" width="504" frameborder="0" allowfullscreen="" title="Embedded post"></iframe>', label:'AT•COURT THIRTEEN' }
  ];

  const track = document.getElementById('track');
  const dotsWrap = document.getElementById('dots');
  const counter = document.getElementById('counter');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const consentBar = document.getElementById('consentBar');
  const consentAllBtn = document.getElementById('consentAllBtn');

  let index = 0;
  let consentGranted = false; // nur im Speicher, kein Cookie, reset bei Reload

  const pairs = [];
  for(let i=0;i<posts.length;i+=2){
    pairs.push(posts.slice(i,i+2));
  }

  function buildSlot(post, globalIndex){
  const slot = document.createElement('div');
  slot.className = 'slot';

  const labelBar = document.createElement('div');
  labelBar.className = 'slot-label';
  labelBar.textContent = post.label || `Post ${globalIndex+1}`;
  slot.appendChild(labelBar);

  const content = document.createElement('div');
  content.className = 'slot-content';
  slot.appendChild(content);

  if(post.type === 'link'){
    const gate = document.createElement('div');
    gate.className = 'gate';
    gate.innerHTML = `
      <div class="num">${String(globalIndex+1).padStart(2,'0')}</div>
      <a class="placeholder-link" href="${post.url}" target="_blank" rel="noopener">Auf LinkedIn ansehen ↗</a>
    `;
    content.appendChild(gate);
    return slot;
  }

  if(consentGranted){
    loadEmbed(content, post);
    return slot;
  }

  const gate = document.createElement('div');
  gate.className = 'gate';
  gate.innerHTML = `
    <div class="num">${String(globalIndex+1).padStart(2,'0')}</div>
    <p>Inhalt wird erst nach Zustimmung geladen. Dabei werden Daten an LinkedIn/Microsoft übertragen.</p>
    <button class="load-btn">Post laden</button>
  `;
  gate.querySelector('.load-btn').addEventListener('click', () => loadEmbed(content, post));
  content.appendChild(gate);
  return slot;
}

  function loadEmbed(slot, post){
    const wrap = document.createElement('div');
    wrap.className = 'slot-embed';
    wrap.innerHTML = post.html;
    slot.innerHTML = '';
    slot.appendChild(wrap);
  }

  function buildPair(pair, pairIndex){
    const el = document.createElement('div');
    el.className = 'pair';
    pair.forEach((post,i) => el.appendChild(buildSlot(post, pairIndex*2+i)));
    return el;
  }

  function render(){
    track.innerHTML = '';
    pairs.forEach((p,i) => track.appendChild(buildPair(p,i)));
    track.style.transform = `translateX(-${index * 100}%)`;
    counter.textContent = `${index+1} / ${pairs.length}`;
    [...dotsWrap.children].forEach((d,i) => d.classList.toggle('active', i===index));
    prevBtn.disabled = index === 0;
    nextBtn.disabled = index === pairs.length - 1;
  }

  pairs.forEach((_,i) => {
    const dot = document.createElement('button');
    dot.innerText = ".";
	dot.setAttribute("value", "indicator");  
    dot.className = 'dot' + (i===0 ? ' active' : '');
    dot.addEventListener('click', () => { index = i; render(); });
    dotsWrap.appendChild(dot);
  });

  function goTo(i){
    index = Math.max(0, Math.min(pairs.length - 1, i));
    render();
  }

  prevBtn.addEventListener('click', () => goTo(index - 1));
  nextBtn.addEventListener('click', () => goTo(index + 1));

  document.addEventListener('keydown', (e) => {
    if(e.key === 'ArrowLeft') goTo(index - 1);
    if(e.key === 'ArrowRight') goTo(index + 1);
  });

let dragging = false;
let dragStartX = 0;
let dragDeltaX = 0;
let stageWidth = 0;

function dragStart(clientX){
  dragging = true;
  dragStartX = clientX;
  dragDeltaX = 0;
  stageWidth = track.parentElement.getBoundingClientRect().width;
  track.style.transition = 'none';   // Transition aus, damit es 1:1 dem Finger folgt
}

function dragMove(clientX){
  if(!dragging) return;
  dragDeltaX = clientX - dragStartX;

  const atStart = index === 0 && dragDeltaX > 0;
  const atEnd = index === pairs.length - 1 && dragDeltaX < 0;
  const resisted = (atStart || atEnd) ? dragDeltaX * 0.35 : dragDeltaX;

  const basePercent = -index * 100;
  const dragPercent = (resisted / stageWidth) * 100;
  track.style.transform = `translateX(calc(${basePercent}% + ${dragPercent}%))`;
}

function dragEnd(){
  if(!dragging) return;
  dragging = false;
  track.style.transition = '';   // Transition wieder an, für den Einrast-Effekt

  const threshold = stageWidth * 0.18;
  if(dragDeltaX > threshold) goTo(index - 1);
  else if(dragDeltaX < -threshold) goTo(index + 1);
  else render();

  dragDeltaX = 0;
}

track.addEventListener('touchstart', e => {
  if(e.target.closest('button, a')) return;
  dragStart(e.touches[0].clientX);
}, {passive:true});
track.addEventListener('touchmove', e => dragMove(e.touches[0].clientX), {passive:true});
track.addEventListener('touchend', dragEnd);
track.addEventListener('touchcancel', dragEnd);

track.addEventListener('mousedown', e => {
  if(e.target.closest('button, a')) return;
  e.preventDefault();
  dragStart(e.clientX);
});
window.addEventListener('mousemove', e => dragMove(e.clientX));
window.addEventListener('mouseup', dragEnd);

  consentAllBtn.addEventListener('click', () => {
    consentGranted = true;
    consentBar.classList.add('granted');
    render();
  });

  render();