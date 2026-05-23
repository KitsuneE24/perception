'use strict';

/* ============================================================
   STATE
   ============================================================ */
let currentIndex   = 0;
let kintsugiPlayed = false;

/* ============================================================
   DOM
   ============================================================ */
const bookIntro   = document.getElementById('book-intro');
const openBtn     = document.getElementById('open-btn');
const bookFlat    = document.getElementById('book-flat');
const spreadCtr   = document.getElementById('spread-counter');
const dotContainer= document.getElementById('dot-indicators');

/* ============================================================
   ERA COLORS
   ============================================================ */
const eraColors = {
  ancient:      '#f0e6cc',
  transition:   '#f3ead8',
  modern:       '#f7f0e4',
  contemporary: '#faf8f4',
  finale:       '#ffffff'
};

/* ============================================================
   OPEN BOOK
   ============================================================ */
function openBook() {
  openBtn.classList.add('hidden');
  bookIntro.classList.add('opening');

  buildDots();

  setTimeout(() => {
    bookFlat.classList.add('visible');
    initTurnJs();
  }, 900);

  setTimeout(() => { bookIntro.classList.add('done'); }, 2100);
  setTimeout(() => { bookIntro.style.display = 'none'; }, 2650);
}
bookIntro.addEventListener('click', openBook);
openBtn.addEventListener('click', e => { e.stopPropagation(); openBook(); });

/* ============================================================
   DOTS
   ============================================================ */
const DOT_DEFS = [
  { label: 'Couverture',   ids: [0],    era: 'cover' },
  { label: 'Marie Curie',  ids: [1, 2], era: 'ancient' },
  { label: 'J. Chauvin',   ids: [3, 4], era: 'transition-era' },
  { label: 'K. Switzer',   ids: [5, 6], era: 'modern' },
  { label: 'Aujourd\'hui', ids: [7, 8], era: 'contemporary' },
  { label: 'Épilogue',     ids: [9],    era: 'finale' },
];

function buildDots() {
  dotContainer.innerHTML = '';
  DOT_DEFS.forEach((g, gi) => {
    if (gi > 0) {
      const sep = document.createElement('div');
      sep.className = 'dot-group-sep';
      dotContainer.appendChild(sep);
    }
    const grp = document.createElement('div');
    grp.className = 'dot-group';
    g.ids.forEach(id => {
      const d = document.createElement('div');
      d.className = `dot ${g.era}`;
      d.title = g.label;
      if (id === currentIndex) d.classList.add('active');
      d.addEventListener('click', () => navigateTo(id));
      grp.appendChild(d);
    });
    dotContainer.appendChild(grp);
  });
}

function updateDots() {
  let flat = 0;
  dotContainer.querySelectorAll('.dot-group').forEach(grp => {
    grp.querySelectorAll('.dot').forEach(d => {
      d.classList.toggle('active', flat === currentIndex);
      flat++;
    });
  });
}

/* ============================================================
   NAV
   ============================================================ */
function navigateTo(idx) {
  // +2 because position 1 is the blank front-cover placeholder
  $('#flipbook').turn('page', idx * 2 + 2);
}

document.addEventListener('keydown', function(e) {
  if (!bookFlat.classList.contains('visible')) return;
  if (e.key === 'ArrowRight') $('#flipbook').turn('next');
  if (e.key === 'ArrowLeft')  $('#flipbook').turn('previous');
});

/* ============================================================
   TURN.JS INIT
   ============================================================ */
function initTurnJs() {
  var pageHtml = [];

  // Slot 1: blank placeholder (turn.js front-cover, never shown)
  pageHtml.push('<div class="page" style="background:#1c4632"></div>');
  // Slot 2: blank dark green — left page of the opening spread
  pageHtml.push('<div class="page" style="background:#1c4632"></div>');
  // Slot 3: cover-right quote page — right page of the opening spread
  pageHtml.push(
    '<div class="page" style="background:' + (eraColors[pages[0].era] || '#f0e6cc') + '">' +
    buildRightHTML(pages[0]) + '</div>'
  );

  // Slots 4+ : all content spreads from pages[1] onwards
  pages.slice(1).forEach(function(page) {
    var bgColor = eraColors[page.era] || '#f0e6cc';

    // Left page — bio pages get the photo as background
    if (page.type === 'bio' && page.photoImg) {
      pageHtml.push(
        '<div class="page bio-page" style="background-image:url(\'' + page.photoImg +
        '\');background-size:cover;background-position:center top;">' +
        buildLeftHTML(page) + '</div>'
      );
    } else {
      pageHtml.push(
        '<div class="page" style="background:' + bgColor + '">' +
        buildLeftHTML(page) + '</div>'
      );
    }

    // Right page
    pageHtml.push(
      '<div class="page" style="background:' + bgColor + '">' +
      buildRightHTML(page) + '</div>'
    );
  });

  $('#flipbook').html(pageHtml.join(''));

  // Show all popup SVG elements immediately (pre-rendered, no per-page animation)
  $('#flipbook .popup-element').addClass('visible');

  $('#flipbook').turn({
    width:        900,
    height:       600,
    autoCenter:   true,
    display:      'double',
    acceleration: true,
    gradients:    true,
    elevation:    50,
    when: {
      turned: function(e, page) {
        // slot 2+3 = opening spread (index 0), slot 4+5 = pages[1], etc.
        currentIndex = Math.max(0, Math.floor((page - 2) / 2));
        spreadCtr.textContent = (currentIndex + 1) + ' / ' + pages.length;
        updateDots();

        var curPage = pages[currentIndex];
        if (curPage && curPage.type === 'finale' && !kintsugiPlayed) {
          kintsugiPlayed = true;
          wireFinale();
          playKintsugi();
        }
      }
    }
  });

  // Open straight to the first spread (blank left + quote right)
  $('#flipbook').turn('page', 2);

  // Click right half → next, click left half → previous
  $('#flipbook').on('click', function(e) {
    var half = $(this).width() / 2;
    var x    = e.pageX - $(this).offset().left;
    if (x > half) {
      $(this).turn('next');
    } else {
      $(this).turn('previous');
    }
  });
}

/* ============================================================
   LEFT PAGE HTML
   ============================================================ */
function buildLeftHTML(page) {
  if (page.type === 'cover')  return coverLeftHTML();
  if (page.type === 'finale') return finaleLeftHTML();
  if (page.type === 'bio')    return bioLeftHTML(page);
  return transitionLeftHTML(page);
}

function coverLeftHTML() {
  return `
    <div class="cover-page">
      <div class="cover-border"></div>
      <div class="cover-border-inner"></div>
      <div class="cover-content">
        <div class="cover-ornament">— ◆ —</div>
        <div class="cover-diamond-wrap">
          <div class="cover-diam-gem cover-gem-top">◆</div>
          <div class="cover-diam-gem cover-gem-right">◆</div>
          <div class="cover-diam-gem cover-gem-bottom">◆</div>
          <div class="cover-diam-gem cover-gem-left">◆</div>
          <div class="cover-diamond-frame">
            <div class="cover-diamond-face">
              <svg viewBox="0 0 88 88" width="66" height="66" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 44 Q44 16 80 44 Q44 72 8 44 Z" fill="rgba(22,56,35,0.4)" stroke="rgba(212,169,106,0.85)" stroke-width="1.8" stroke-linecap="round"/>
                <path d="M20 36 Q44 24 68 36" fill="none" stroke="rgba(212,169,106,0.28)" stroke-width="0.9"/>
                <circle cx="44" cy="44" r="16" fill="rgba(212,169,106,0.08)" stroke="rgba(212,169,106,0.72)" stroke-width="1.5"/>
                <path d="M44 28 C48 34 48 39 44 44 C40 39 40 34 44 28" fill="rgba(212,169,106,0.14)" stroke="rgba(212,169,106,0.42)" stroke-width="0.9"/>
                <path d="M44 60 C48 54 48 49 44 44 C40 49 40 54 44 60" fill="rgba(212,169,106,0.14)" stroke="rgba(212,169,106,0.42)" stroke-width="0.9"/>
                <circle cx="44" cy="44" r="7" fill="rgba(22,56,35,0.92)" stroke="rgba(212,169,106,0.55)" stroke-width="1"/>
                <circle cx="49" cy="39" r="4" fill="rgba(212,169,106,0.82)"/>
                <circle cx="49" cy="39" r="1.8" fill="rgba(255,240,180,0.95)"/>
              </svg>
            </div>
          </div>
        </div>
        <div class="cover-title-big">Perception</div>
        <div class="cover-tagline">Une œuvre sur la perception,<br>le temps, et celles qui ont osé.</div>
        <div class="cover-grimoire-tag">✦ Une Œuvre · 2026 ✦</div>
      </div>
    </div>`;
}

function bioLeftHTML(page) {
  return `
    <div class="bio-text-block">
      <p class="bio-name-tag">${page.year} · ${page.domain} · ${page.location}</p>
      <h1 class="bio-name">${page.name}</h1>
      <p class="bio-desc">${page.description}</p>
      ${page.photoCaption ? `<p class="bio-img-credit">${page.photoCaption}</p>` : ''}
    </div>`;
}

function transitionLeftHTML(page) {
  return `
    <div class="popup-area">
      <div class="popup-element">${page.svgLeft}</div>
    </div>`;
}

function finaleLeftHTML() {
  return `
    <div class="finale-left">
      <div class="finale-message">Le regard évolue.<br>Grâce à elles. Grâce à nous.</div>
      <div class="finale-names">
        Marie Curie · Sciences · 1867<br>
        Jeanne Chauvin · Droit · 1903<br>
        Kathrine Switzer · Sport · 1967<br>
        <em>Et toutes celles dont on n'a pas encore écrit le nom.</em>
      </div>
      <div class="finale-central-message">
        Chaque regard qui change,<br>change quelque chose.
      </div>
      <div class="recommencer-link" id="recommencer-link">↺ Recommencer</div>
    </div>`;
}

/* ============================================================
   RIGHT PAGE HTML
   ============================================================ */
function buildRightHTML(page) {
  if (page.type === 'cover')  return coverRightHTML(page);
  if (page.type === 'finale') return finaleRightHTML();
  if (page.type === 'bio')    return bioRightHTML(page);
  return transitionRightHTML(page);
}

function coverRightHTML(page) {
  return `
    <div class="cover-right">
      <div class="popup-area">
        <div class="popup-element">${page.svgPopup}</div>
      </div>
      <div class="cover-right-quote">
        « La perception n'est jamais figée.<br>
        Elle change grâce au temps,<br>
        aux actes, et aux personnes qui osent. »
      </div>
      <div class="cover-right-sub">— Perception</div>
    </div>`;
}

function bioRightHTML(page) {
  return `
    <div class="bio-right-content">
      <p class="bio-right-tag">Ce qu'on lui a dit</p>
      <blockquote class="bio-quote">${page.biasQuote}</blockquote>
      <p class="bio-decode">${page.decode}</p>
    </div>`;
}

function transitionRightHTML(page) {
  return `
    <div class="popup-area">
      <div class="popup-element">${page.svgRight}</div>
    </div>`;
}

function finaleRightHTML() {
  return `
    <div class="finale-right">
      <div class="kintsugi-container" id="kintsugi-container">
        <div class="kintsugi-book-cover" id="kintsugi-cover"></div>
        <svg class="kintsugi-svg" viewBox="0 0 220 300" xmlns="http://www.w3.org/2000/svg">
          <path class="kintsugi-crack" id="crack1"  d="M110 150 L140 100 L160 75 L155 60"/>
          <path class="kintsugi-crack" id="crack2"  d="M110 150 L75 110 L50 80 L40 55"/>
          <path class="kintsugi-crack" id="crack3"  d="M110 150 L130 190 L150 230 L145 260"/>
          <path class="kintsugi-crack" id="crack4"  d="M110 150 L85 200 L60 240 L55 265"/>
          <path class="kintsugi-crack" id="crack5"  d="M110 150 L170 155 L200 160"/>
          <path class="kintsugi-crack" id="crack6"  d="M110 150 L50 145 L20 140"/>
          <path class="kintsugi-crack" id="crack7"  d="M140 100 L160 115 L175 125"/>
          <path class="kintsugi-crack" id="crack8"  d="M75 110 L60 125 L45 128"/>
          <path class="kintsugi-crack" id="crack9"  d="M110 150 L113 92 L109 44 L112 6"/>
          <path class="kintsugi-crack" id="crack10" d="M155 60 L180 34 L210 8"/>
          <path class="kintsugi-crack" id="crack11" d="M40 55 L17 28 L3 5"/>
          <path class="kintsugi-crack" id="crack12" d="M145 260 L168 283 L206 298"/>
          <path class="kintsugi-crack" id="crack13" d="M55 265 L30 284 L6 298"/>
          <path class="kintsugi-crack" id="crack14" d="M175 125 L198 96 L217 65"/>
          <path class="kintsugi-crack" id="crack15" d="M45 128 L20 96 L5 60"/>
          <path class="kintsugi-crack" id="crack16" d="M200 160 L218 194 L219 238"/>
          <path class="kintsugi-crack" id="crack17" d="M20 140 L4 174 L6 218"/>
          <path class="kintsugi-crack" id="crack18" d="M109 44 L138 62 L163 48"/>
          <path class="kintsugi-crack" id="crack19" d="M113 92 L84 66 L56 46"/>
          <path class="kintsugi-crack" id="crack20" d="M110 150 L111 222 L109 292"/>
        </svg>
      </div>
      <div class="finale-text-container" id="finale-text">
        <div class="finale-line1">Le regard évolue.</div>
        <div class="finale-line2">Grâce à elles. Grâce à nous.</div>
        <div class="finale-divider" id="finale-divider" style="opacity:0;margin:12px auto;"></div>
        <div class="finale-question" id="finale-question" style="opacity:0;">
          Chaque regard qui change,<br>change quelque chose.
        </div>
      </div>
    </div>`;
}

/* ============================================================
   FINALE WIRING
   ============================================================ */
function wireFinale() {
  const link = document.getElementById('recommencer-link');
  if (link) {
    link.addEventListener('click', () => {
      currentIndex   = 0;
      kintsugiPlayed = false;
      $('#flipbook').turn('page', 1);
    });
  }
}

/* ============================================================
   KINTSUGI
   ============================================================ */
function playKintsugi() {
  const cracks  = document.querySelectorAll('.kintsugi-crack');
  const cover   = document.getElementById('kintsugi-cover');
  const finText = document.getElementById('finale-text');
  const finDiv  = document.getElementById('finale-divider');
  const finQ    = document.getElementById('finale-question');

  cracks.forEach(c => {
    try {
      const len = c.getTotalLength ? c.getTotalLength() : 200;
      c.style.strokeDasharray  = len;
      c.style.strokeDashoffset = len;
    } catch(e) {
      c.style.strokeDasharray = c.style.strokeDashoffset = 200;
    }
  });

  setTimeout(() => {
    cover.style.filter     = 'brightness(0.85)';
    cover.style.transition = 'filter 1.5s ease';
    cracks.forEach((c, i) => {
      c.style.transition       = `stroke-dashoffset ${0.6 + i * 0.1}s ease-out ${i * 0.1}s`;
      c.style.strokeDashoffset = '0';
    });
  }, 400);

  setTimeout(() => { cracks.forEach(c => c.classList.add('gold')); cover.style.filter = 'brightness(1.05)'; }, 1600);
  setTimeout(() => { cover.style.opacity = '0.15'; finText.classList.add('visible'); }, 2800);
  setTimeout(() => { finDiv.style.transition = 'opacity 0.6s ease'; finDiv.style.opacity = '1'; }, 4200);
  setTimeout(() => { finQ.style.transition   = 'opacity 1s ease';   finQ.style.opacity   = '1'; }, 5000);
}

/* ============================================================
   INIT
   ============================================================ */
pages.forEach(p => {
  if (p.photoImg) {
    const img = new Image();
    img.src = p.photoImg;
    if (img.decode) img.decode().catch(() => {});
  }
});
buildDots();
