  // burger nav
  const burger = document.getElementById('burger');
  const navlinks = document.getElementById('navlinks');
  burger.addEventListener('click', () => {
    navlinks.classList.toggle('open');
  });
  navlinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navlinks.classList.remove('open')));

  // client ticker content
  const clients = ["A1","Abarth","accenture","Alfa Romeo","Allianz","At Court Thirteen","Attensam","Autohaus Schmid-Fally","Bank Austria","Billa","Casinos Austria","Deutsche Bank","Deutsche Krebsgesellschaft","Die Presse","DSV Fortuna 05","Erste Bank","EVN","Fiat","Gesund ist Besser","Heinemann","Hummingbird21","Hyundai","indeed!","ITZ Projects","Jaguar","KIA","Kleine Zeitung","Land Rover","Lanxess","Leaseplan","LEXUS","Lungenordination Baden","MABES","MAZDA","Novartis","OMV","Opel","Österr. Gehörlosenbund","Österr. Volksliedwerk","PARAGON","PE-IMMO","Peter Frey Gallery","Peugeot","Pfarre Perchtholdsdorf","Post","Renault","SALT Salzburg","Samsung","Schöpping","Stellantis","Style in Progress","T-Mobile","TBWA","Technisches Museum Wien","Theresa Feyertag","TOYOTA","TTTech","Unisys","Volkshilfe NÖ","VOLVO","W24","Wiener Bühnenverein","WKO Wien"];
  function buildTicker(el, arr){
    const frag = document.createDocumentFragment();
    [...arr, ...arr].forEach(name => {
      const s = document.createElement('span');
      s.textContent = name;
      frag.appendChild(s);
    });
    el.appendChild(frag);
  }
  buildTicker(document.getElementById('tickerA'), clients.slice(0, Math.ceil(clients.length/2)));
  buildTicker(document.getElementById('tickerB'), clients.slice(Math.ceil(clients.length/2)));

  // testimonials
  const testimonials = [
    ["Die Zusammenarbeit war vom ersten Moment an absolut herausragend — unsere neue Homepage übertrifft alle Erwartungen.", "Mag. Alexander Bittner, Autohaus Schmid-Fally"],
    ["Stephan fössl is the best ever — kaum besprochen, hat er es schon umgesetzt, mit kreativer Lösung für jedes Problem.", "Jutta Itzinger"],
    ["Vielen lieben Dank für deinen unermüdlichen Einsatz. Das Ergebnis ist sehr, sehr ansprechend und überaus gelungen.", "Patrick Fally, indeed!"],
    ["Perfekt — danke dir. Was für eine schöne Seite das geworden ist!", "Jasmin March, Stellantis"],
    ["Vielen herzlichen Dank für die professionelle und rasche Umsetzung unserer Homepage, wir sind begeistert!", "Dr. Julia Hauswirth-Kleiber"],
    ["Waaahnsinn! Du arbeitest auch nach 11 Jahren auf Top-Niveau.", "Wolfgang Rothauer"],
    ["Danke vorweg für die schnelle Umsetzung! Es macht Freude, mit dir zu arbeiten.", "Dr. Bernd Wollmann, Casinos Austria"],
    ["Sehr super geworden! Super super super, sag ich nur.", "Jakobus Theiner, SHÖPPING.AT"],
  ];
  const testiTrack = document.getElementById('testiTrack');
  [...testimonials, ...testimonials].forEach(([quote, author]) => {
    const card = document.createElement('div');
    card.className = 'testi-card';
    card.innerHTML = `<p>"${quote}"</p><cite>— ${author}</cite>`;
    testiTrack.appendChild(card);
  });

  // scrollspy rail
  const sections = ['hero','services','skills','clients','showreel','testimonials','kontakt'].map(id => document.getElementById(id));
  const dots = document.querySelectorAll('.rail .dot');
  const navA = document.querySelectorAll('.navlinks a');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        const id = entry.target.id;
        dots.forEach(d => d.classList.toggle('active', d.dataset.target === id));
        navA.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + id));
      }
    });
  }, {rootMargin:'-45% 0px -45% 0px'});
  sections.forEach(s => s && io.observe(s));
  dots.forEach(d => d.addEventListener('click', () => {
    document.getElementById(d.dataset.target).scrollIntoView({behavior:'smooth'});
  }));

  // lightbox modals (Impressum / Datenschutz)
  const openers = document.querySelectorAll('[data-modal-open]');
  let activeModal = null;

  function openModal(id){
    const overlay = document.getElementById('modal-' + id);
    if(!overlay) return;
    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-lock');
    activeModal = overlay;
  }
  function closeModal(overlay){
    if(!overlay) return;
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-lock');
    if(activeModal === overlay) activeModal = null;
  }

  openers.forEach(a => a.addEventListener('click', (e) => {
    e.preventDefault();
    openModal(a.dataset.modalOpen);
  }));

  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if(e.target === overlay) closeModal(overlay);
    });
    overlay.querySelectorAll('[data-modal-close]').forEach(btn => {
      btn.addEventListener('click', () => closeModal(overlay));
    });
  });

  document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape' && activeModal) closeModal(activeModal);
  });

  // project gallery: randomize order on load (masonry)
  (function shuffleProjectGrid(){
    const grid = document.getElementById('projectGrid');
    if(!grid) return;
    const cards = Array.from(grid.children);
    for(let i = cards.length - 1; i > 0; i--){
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    cards.forEach(card => grid.appendChild(card));
  })();

  // project gallery filter (masonry)
  const filterPills = document.querySelectorAll('#filterPills .filter-pill');
  const projectCards = document.querySelectorAll('#projectGrid .project-card');
  const activeFilters = new Set(['all']);

  function applyFilters(){
    projectCards.forEach(card => {
      const tags = card.dataset.tags.split(',');
      const visible = activeFilters.has('all') || tags.some(t => activeFilters.has(t));
      card.classList.toggle('is-hidden', !visible);
    });
  }

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const filter = pill.dataset.filter;
      if(filter === 'all'){
        activeFilters.clear();
        activeFilters.add('all');
      } else {
        activeFilters.delete('all');
        if(activeFilters.has(filter)){
          activeFilters.delete(filter);
        } else {
          activeFilters.add(filter);
        }
        if(activeFilters.size === 0){
          activeFilters.add('all');
        }
      }
      filterPills.forEach(p => p.classList.toggle('active', activeFilters.has(p.dataset.filter)));
      applyFilters();
    });
  });

  // reduced motion: pause SMIL jump-dot
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    document.querySelectorAll('animateMotion').forEach(a => a.remove());
  }

const size = 64;
const canvas = document.getElementById('FavCanvas');
const ctx = canvas.getContext('2d');
const faviconLink = document.getElementById('favicon');

let t = 0;

function draw() {
  // Hintergrund: schwarz
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, size, size);

  // Springender Punkt, zentriert im Favicon
  const groundY = 46;         // "Boden"-Linie des Punkts
  const amplitude = 22;       // Sprunghöhe
  const bounce = Math.abs(Math.sin(t)); // 0 -> 1 -> 0, wie ein Ball-Sprung
  const dotY = groundY - amplitude * bounce;

  ctx.beginPath();
  ctx.arc(size / 2, dotY, 6, 0, Math.PI * 2);
  ctx.fillStyle = '#B5E479'; // knalliger Akzent, gut sichtbar in klein
  ctx.fill();

  t += 0.25;

  // Favicon aus Canvas aktualisieren
  faviconLink.href = canvas.toDataURL('image/png');
}

setInterval(draw, 80);
draw();