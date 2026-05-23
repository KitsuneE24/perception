'use strict';

/* ============================================================
   STATE
   ============================================================ */
let currentIndex   = 0;
let isAnimating    = false;
let kintsugiPlayed = false;

/* ============================================================
   DOM
   ============================================================ */
const bookIntro   = document.getElementById('book-intro');
const openBtn     = document.getElementById('open-btn');
const bookFlat    = document.getElementById('book-flat');
const bookBody    = document.getElementById('book-body');
const pageLeftInn = document.getElementById('page-left-inner');
const pageRightInn= document.getElementById('page-right-inner');
const btnPrev     = document.getElementById('btn-prev');
const btnNext     = document.getElementById('btn-next');
const spreadCtr   = document.getElementById('spread-counter');
const dotContainer= document.getElementById('dot-indicators');
const flipWrap    = document.getElementById('page-turn-wrap');
const flipFront   = document.getElementById('flip-front');
const flipBack    = document.getElementById('flip-back');

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
   RIFFLE — rapid page-leafing sequence before content
   ============================================================ */
const PAGE_COLORS = [
  { front: '#e8dcc8', back: '#ede5d4' },
  { front: '#f0e6cc', back: '#f3ead8' },
  { front: '#eee4cc', back: '#f0e8d4' },
  { front: '#f3ead8', back: '#f5efdf' },
  { front: '#f0e8d0', back: '#f3ecdb' },
];

function runRiffle(callback) {
  const overlay = document.getElementById('riffle-overlay');
  overlay.innerHTML = '';

  const DELAY   = 280;  // ms between each page flip
  const FLIP_MS = 420;  // duration of one flip (matches @keyframes)
  const COUNT   = 5;

  PAGE_COLORS.forEach((colors, i) => {
    const page = document.createElement('div');
    page.className = 'rp';
    page.style.animationDelay = `${i * DELAY}ms`;
    page.style.zIndex = COUNT - i;

    // Front face
    const front = document.createElement('div');
    front.className = 'rp-front';
    front.style.background = `
      linear-gradient(to bottom,
        ${colors.front} 0%,
        ${lighten(colors.front)} 50%,
        ${colors.front} 100%
      )`;

    // Back face (slightly different shade — reverse of book)
    const back = document.createElement('div');
    back.className = 'rp-back';
    back.style.background = colors.back;

    page.appendChild(front);
    page.appendChild(back);
    overlay.appendChild(page);
  });

  overlay.classList.add('active');

  // Fade out after all pages have turned
  const totalFlipEnd = (COUNT - 1) * DELAY + FLIP_MS;
  setTimeout(() => {
    overlay.classList.add('fading');
    setTimeout(() => {
      overlay.innerHTML = '';
      overlay.classList.remove('active', 'fading');
      callback();
    }, 480);
  }, totalFlipEnd + 80);
}

function lighten(hex) {
  // Very subtly lighten a hex color for gradient midpoint
  return hex;
}

/* ============================================================
   OPEN BOOK
   ============================================================ */
function openBook() {
  openBtn.classList.add('hidden');
  bookIntro.classList.add('opening');

  // All page animations finish: last page delay 1.3s + 0.65s duration = 1.95s
  setTimeout(() => {
    bookIntro.classList.add('done');
    bookFlat.classList.add('visible');
    buildDots();
    bookBody.dataset.era = 'ancient';
    pageLeftInn.innerHTML  = coverLeftHTML(pages[0]);
    pageRightInn.innerHTML = coverRightHTML(pages[0]);
    runRiffle(() => { renderSpread(0); });
  }, 2100);

  setTimeout(() => { bookIntro.style.display = 'none'; }, 2650);
}
bookIntro.addEventListener('click', openBook);
openBtn.addEventListener('click', e => { e.stopPropagation(); openBook(); });

/* ============================================================
   DOTS
   ============================================================ */
const DOT_DEFS = [
  { label: 'Couverture',   ids: [0], era: 'cover' },
  { label: 'Marie Curie',  ids: [1], era: 'ancient' },
  { label: 'J. Chauvin',   ids: [2], era: 'transition-era' },
  { label: 'K. Switzer',   ids: [3], era: 'modern' },
  { label: 'Aujourd\'hui', ids: [4], era: 'contemporary' },
  { label: 'Épilogue',     ids: [5], era: 'finale' },
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
function updateNav() {
  btnPrev.disabled = currentIndex === 0;
  btnNext.disabled = currentIndex === pages.length - 1;
  spreadCtr.textContent = `${currentIndex + 1} / ${pages.length}`;
  updateDots();
}

function navigateTo(idx) {
  if (isAnimating || idx === currentIndex) return;
  const dir  = idx > currentIndex ? 'forward' : 'back';
  const from = currentIndex;
  currentIndex = idx;
  collapsePopups(() => flipPage(dir, from, idx));
}

btnPrev.addEventListener('click', () => { if (currentIndex > 0) navigateTo(currentIndex - 1); });
btnNext.addEventListener('click', () => { if (currentIndex < pages.length - 1) navigateTo(currentIndex + 1); });

document.addEventListener('keydown', e => {
  if (!bookFlat.classList.contains('visible')) return;
  if (e.key === 'ArrowRight' || e.key === 'ArrowDown') btnNext.click();
  if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')   btnPrev.click();
});

/* ============================================================
   PAGE FLIP
   ============================================================ */
function flipPage(dir, fromIdx, toIdx) {
  isAnimating = true;
  const fromColor = eraColors[pages[fromIdx].era] || '#f0e6cc';
  const toColor   = eraColors[pages[toIdx].era]   || '#f0e6cc';

  if (dir === 'forward') {
    // Right page flips over → left. Wrap sits over right half, pivots on left edge.
    flipFront.style.background = fromColor;
    flipFront.style.padding    = '24px 22px 18px';
    flipFront.innerHTML        = pageRightInn.innerHTML;

    flipBack.style.background  = toColor;
    flipBack.style.padding     = '24px 22px 18px';
    flipBack.innerHTML         = buildLeftHTML(pages[toIdx]);

    flipWrap.style.left            = '50%';
    flipWrap.style.width           = '50%';
    flipWrap.style.transformOrigin = 'left center';
  } else {
    // Left page flips over → right. Wrap sits over left half, pivots on right edge.
    flipFront.style.background = fromColor;
    flipFront.style.padding    = '24px 22px 18px';
    flipFront.innerHTML        = pageLeftInn.innerHTML;

    flipBack.style.background  = toColor;
    flipBack.style.padding     = '24px 22px 18px';
    flipBack.innerHTML         = buildRightHTML(pages[toIdx]);

    flipWrap.style.left            = '0';
    flipWrap.style.width           = '50%';
    flipWrap.style.transformOrigin = 'right center';
  }

  flipWrap.classList.add('active');
  void flipWrap.offsetWidth;
  flipWrap.classList.add(dir === 'forward' ? 'turning-forward' : 'turning-back');

  setTimeout(() => {
    bookBody.dataset.era = pages[toIdx].era;
    renderSpread(toIdx);
  }, 430);

  setTimeout(() => {
    flipWrap.classList.remove('active', 'turning-forward', 'turning-back');
    isAnimating = false;
  }, 880);
}

/* ============================================================
   COLLAPSE POPUPS
   ============================================================ */
function collapsePopups(cb) {
  const pp = document.querySelectorAll('.popup-element.visible');
  if (!pp.length) { cb(); return; }
  pp.forEach(p => { p.classList.remove('visible'); p.classList.add('collapsing'); });
  setTimeout(cb, 180);
}

/* ============================================================
   RENDER
   ============================================================ */
function renderSpread(idx) {
  const page = pages[idx];
  bookBody.dataset.era = page.era;
  updateNav();

  pageLeftInn.innerHTML  = buildLeftHTML(page);
  pageRightInn.innerHTML = buildRightHTML(page);

  if (page.type === 'finale') {
    wireFinale();
    if (!kintsugiPlayed) { kintsugiPlayed = true; playKintsugi(); }
    return;
  }
  schedulePopups();
}

/* ============================================================
   LEFT PAGE HTML
   ============================================================ */
function buildLeftHTML(page) {
  if (page.type === 'cover')  return coverLeftHTML();
  if (page.type === 'finale') return finaleLeftHTML();
  return storyLeftHTML(page);
}

function coverLeftHTML() {
  return `
    <div class="cover-page">
      <div class="cover-texture"></div>
      <div class="cover-border"></div>
      <div class="cover-content">
        <div class="cover-ornament">✦ ✦ ✦</div>
        <div class="cover-title-big">Le Regard</div>
        <div class="cover-tagline">Une œuvre sur la perception,<br>le temps, et celles qui ont osé.</div>
        <div class="cover-year">2026</div>
      </div>
    </div>`;
}

function storyLeftHTML(page) {
  return `
    <div class="story-header">
      <span class="story-year">${page.year}</span>
      <span class="story-sep">·</span>
      <span class="story-name">${page.name}</span>
      <span class="story-sep">·</span>
      <span class="story-domain">${page.domain}</span>
    </div>

    <div class="block block-perception">
      <div class="block-label">Ce qu'on pensait</div>
      <div class="block-quote">${page.perception}</div>
    </div>

    <div class="block block-acte">
      <div class="block-label">Ce qu'elle a fait</div>
      <div class="block-text">${page.acte}</div>
    </div>

    <div class="page-motif">${page.motif}</div>`;
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
  return storyRightHTML(page);
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
      <div class="cover-right-sub">— Le Regard</div>
      <div class="cover-right-hint">Suivant → pour commencer</div>
    </div>`;
}

function storyRightHTML(page) {
  const photo = page.photoUrl ? `
    <div class="photo-vignette">
      <img src="${page.photoUrl}" alt="${page.photoCaption}"
        onerror="this.style.display='none';this.nextElementSibling.style.display='flex';" />
      <div class="photo-placeholder" style="display:none;">${page.name}</div>
      <div class="photo-caption">${page.photoCaption}</div>
    </div>` : '';

  return `
    <div class="popup-area">
      <div class="popup-element">${page.svgPopup}</div>
    </div>

    <div class="block block-changement">
      <div class="block-label">Ce que ça a ouvert</div>
      <div class="block-text">${page.changement}</div>
    </div>

    ${photo}

    <div class="page-motif">${page.motif}</div>`;
}

function finaleRightHTML() {
  return `
    <div class="finale-right">
      <div class="kintsugi-container" id="kintsugi-container">
        <div class="kintsugi-book-cover" id="kintsugi-cover"></div>
        <svg class="kintsugi-svg" viewBox="0 0 220 300" xmlns="http://www.w3.org/2000/svg">
          <path class="kintsugi-crack" id="crack1" d="M110 150 L140 100 L160 75 L155 60"/>
          <path class="kintsugi-crack" id="crack2" d="M110 150 L75 110 L50 80 L40 55"/>
          <path class="kintsugi-crack" id="crack3" d="M110 150 L130 190 L150 230 L145 260"/>
          <path class="kintsugi-crack" id="crack4" d="M110 150 L85 200 L60 240 L55 265"/>
          <path class="kintsugi-crack" id="crack5" d="M110 150 L170 155 L200 160"/>
          <path class="kintsugi-crack" id="crack6" d="M110 150 L50 145 L20 140"/>
          <path class="kintsugi-crack" id="crack7" d="M140 100 L160 115 L175 125"/>
          <path class="kintsugi-crack" id="crack8" d="M75 110 L60 125 L45 128"/>
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
      currentIndex = 0;
      kintsugiPlayed = false;
      renderSpread(0);
    });
  }
}

/* ============================================================
   KINTSUGI
   ============================================================ */
function playKintsugi() {
  const cracks    = document.querySelectorAll('.kintsugi-crack');
  const cover     = document.getElementById('kintsugi-cover');
  const finText   = document.getElementById('finale-text');
  const finDiv    = document.getElementById('finale-divider');
  const finQ      = document.getElementById('finale-question');

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
   POPUP ANIMATION
   ============================================================ */
function schedulePopups() {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      document.querySelectorAll('.popup-element').forEach((p, i) => {
        setTimeout(() => p.classList.add('visible'), i * 200);
      });
    });
  });
}

/* ============================================================
   INIT
   ============================================================ */
buildDots();
