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
   OPEN BOOK
   ============================================================ */
function openBook() {
  openBtn.classList.add('hidden');
  bookIntro.classList.add('opening');

  // Prepare flat book immediately so it's ready behind the 3D animation
  buildDots();
  bookBody.dataset.era = 'ancient';
  renderSpread(0);

  // Reveal flat book while pages are still fanning (front cover finishes at ~0.9s)
  setTimeout(() => { bookFlat.classList.add('visible'); }, 900);

  // Fade out 3D book after all page animations finish (~1.95s)
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
function updateNav() {
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

document.addEventListener('keydown', e => {
  if (!bookFlat.classList.contains('visible')) return;
  if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { if (currentIndex < pages.length - 1) navigateTo(currentIndex + 1); }
  if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')   { if (currentIndex > 0) navigateTo(currentIndex - 1); }
});

/* ============================================================
   DRAG-TO-FLIP
   ============================================================ */
let drag = null;

function prepareDrag(e, dir) {
  if (isAnimating) return;
  if (e.target.closest('a, button')) return;
  if (dir === 'forward' && currentIndex >= pages.length - 1) return;
  if (dir === 'back'    && currentIndex <= 0) return;
  drag = {
    dir,
    fromIdx:  currentIndex,
    toIdx:    dir === 'forward' ? currentIndex + 1 : currentIndex - 1,
    bookRect: document.querySelector('.book-container').getBoundingClientRect(),
    startX:   e.clientX,
    startY:   e.clientY,
    active:   false
  };
}

function activateDrag() {
  const { dir, fromIdx, toIdx } = drag;
  const fromPage  = pages[fromIdx];
  const toPage    = pages[toIdx];
  const fromColor = eraColors[fromPage.era] || '#f0e6cc';
  const toColor   = eraColors[toPage.era]   || '#f0e6cc';

  if (dir === 'forward') {
    setPlainFlipFace(flipFront, fromColor, pageRightInn.innerHTML);
    if (toPage.type === 'bio' && toPage.photoImg) setBioFlipFace(flipBack, toPage);
    else setPlainFlipFace(flipBack, toColor, buildLeftHTML(toPage));
    flipWrap.style.left = '50%';
    flipWrap.style.width = '50%';
    flipWrap.style.transformOrigin = 'left top';
  } else {
    if (fromPage.type === 'bio' && fromPage.photoImg) setBioFlipFace(flipFront, fromPage);
    else setPlainFlipFace(flipFront, fromColor, pageLeftInn.innerHTML);
    setPlainFlipFace(flipBack, toColor, buildRightHTML(toPage));
    flipWrap.style.left = '0';
    flipWrap.style.width = '50%';
    flipWrap.style.transformOrigin = 'right top';
  }

  flipWrap.classList.add('active');
  drag.active = true;
  isAnimating = true;
}

function calcDragAngle(cx) {
  const { dir, bookRect } = drag;
  const W  = bookRect.width;
  const mx = cx - bookRect.left;
  if (dir === 'forward') return Math.max(-180, Math.min(0, (mx / W - 1) * 180));
  return Math.max(0, Math.min(180, (mx / W) * 180));
}

document.addEventListener('pointermove', e => {
  if (!drag) return;
  if (!drag.active) {
    if (Math.hypot(e.clientX - drag.startX, e.clientY - drag.startY) < 8) return;
    activateDrag();
  }
  const angle = calcDragAngle(e.clientX);
  const lift  = Math.sin((Math.abs(angle) / 180) * Math.PI) * 38;
  flipWrap.style.transform = `perspective(1800px) rotateY(${angle}deg) translateZ(${lift}px)`;
  e.preventDefault();
}, { passive: false });

document.addEventListener('pointerup', e => {
  if (!drag) return;
  const { dir, toIdx, active } = drag;
  drag = null;

  if (!active) {
    // Tap without drag — play the full CSS animation
    if (dir === 'forward' && currentIndex < pages.length - 1) navigateTo(currentIndex + 1);
    else if (dir === 'back' && currentIndex > 0)              navigateTo(currentIndex - 1);
    return;
  }

  const m     = flipWrap.style.transform.match(/rotateY\(([^d]+)deg\)/);
  const angle = m ? parseFloat(m[1]) : 0;

  if (Math.abs(angle) >= 60) {
    // Past threshold — complete the flip
    currentIndex = toIdx;
    const finalAngle = dir === 'forward' ? -180 : 180;
    flipWrap.style.transition = 'transform 0.4s cubic-bezier(0.33, 0, 0.25, 1)';
    flipWrap.style.transform  = `perspective(1800px) rotateY(${finalAngle}deg) translateZ(0)`;
    document.querySelectorAll('.popup-element.visible').forEach(p => {
      p.classList.remove('visible'); p.classList.add('collapsing');
    });
    setTimeout(() => { bookBody.dataset.era = pages[toIdx].era; renderSpread(toIdx); }, 220);
    setTimeout(() => {
      flipWrap.style.transition = ''; flipWrap.style.transform = '';
      flipWrap.classList.remove('active'); isAnimating = false;
    }, 460);
  } else {
    // Below threshold — snap back
    flipWrap.style.transition = 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    flipWrap.style.transform  = 'perspective(1800px) rotateY(0deg) translateZ(0)';
    setTimeout(() => {
      flipWrap.style.transition = ''; flipWrap.style.transform = '';
      flipWrap.classList.remove('active'); isAnimating = false;
    }, 350);
  }
});

document.addEventListener('pointercancel', () => {
  if (!drag || !drag.active) { drag = null; return; }
  drag = null;
  flipWrap.style.transition = ''; flipWrap.style.transform = '';
  flipWrap.classList.remove('active'); isAnimating = false;
});

document.getElementById('page-right').addEventListener('pointerdown', e => prepareDrag(e, 'forward'));
document.getElementById('page-left').addEventListener('pointerdown',  e => prepareDrag(e, 'back'));

/* ============================================================
   PAGE FLIP
   ============================================================ */
function setBioFlipFace(el, page) {
  el.style.background           = '#111';
  el.style.backgroundImage      = `url('${page.photoImg}')`;
  el.style.backgroundSize       = 'cover';
  el.style.backgroundPosition   = 'center top';
  el.style.padding              = '0';
  el.innerHTML                  = '';
}

function setPlainFlipFace(el, color, html) {
  el.style.background      = color;
  el.style.backgroundImage = '';
  el.style.padding         = '24px 22px 18px';
  el.innerHTML             = html;
}

function flipPage(dir, fromIdx, toIdx) {
  isAnimating = true;
  const fromPage  = pages[fromIdx];
  const toPage    = pages[toIdx];
  const fromColor = eraColors[fromPage.era] || '#f0e6cc';
  const toColor   = eraColors[toPage.era]   || '#f0e6cc';

  if (dir === 'forward') {
    setPlainFlipFace(flipFront, fromColor, pageRightInn.innerHTML);

    if (toPage.type === 'bio' && toPage.photoImg) {
      setBioFlipFace(flipBack, toPage);
    } else {
      setPlainFlipFace(flipBack, toColor, buildLeftHTML(toPage));
    }

    flipWrap.style.left            = '50%';
    flipWrap.style.width           = '50%';
    flipWrap.style.transformOrigin = 'left top';
  } else {
    if (fromPage.type === 'bio' && fromPage.photoImg) {
      setBioFlipFace(flipFront, fromPage);
    } else {
      setPlainFlipFace(flipFront, fromColor, pageLeftInn.innerHTML);
    }

    setPlainFlipFace(flipBack, toColor, buildRightHTML(toPage));

    flipWrap.style.left            = '0';
    flipWrap.style.width           = '50%';
    flipWrap.style.transformOrigin = 'right top';
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
  const page      = pages[idx];
  const pageLeftEl = document.getElementById('page-left');
  bookBody.dataset.era = page.era;
  updateNav();

  if (page.type === 'bio') {
    pageLeftEl.classList.add('bio-page');
    if (page.photoImg) {
      pageLeftEl.style.backgroundImage    = `url('${page.photoImg}')`;
      pageLeftEl.style.backgroundSize     = 'cover';
      pageLeftEl.style.backgroundPosition = 'center top';
    } else {
      pageLeftEl.style.backgroundImage = '';
    }
  } else {
    pageLeftEl.classList.remove('bio-page');
    pageLeftEl.style.backgroundImage    = '';
    pageLeftEl.style.backgroundSize     = '';
    pageLeftEl.style.backgroundPosition = '';
  }

  pageLeftInn.innerHTML  = buildLeftHTML(page);
  pageRightInn.innerHTML = buildRightHTML(page);

  if (page.type === 'finale') {
    wireFinale();
    if (!kintsugiPlayed) { kintsugiPlayed = true; playKintsugi(); }
    return;
  }
  if (page.type !== 'bio') schedulePopups();
}

/* ============================================================
   LEFT PAGE HTML
   ============================================================ */
function buildLeftHTML(page) {
  if (page.type === 'cover')      return coverLeftHTML();
  if (page.type === 'finale')     return finaleLeftHTML();
  if (page.type === 'bio')        return bioLeftHTML(page);
  return transitionLeftHTML(page);
}

function coverLeftHTML() {
  return `
    <div class="cover-page">
      <div class="cover-texture"></div>
      <div class="cover-border"></div>
      <div class="cover-border-inner"></div>
      <div class="cover-content">
        <div class="cover-author-line">✦ Xiao Huli ✦</div>
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
  if (page.type === 'cover')      return coverRightHTML(page);
  if (page.type === 'finale')     return finaleRightHTML();
  if (page.type === 'bio')        return bioRightHTML(page);
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
      <div class="cover-right-hint">Suivant → pour commencer</div>
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
pages.forEach(p => {
  if (p.photoImg) {
    const img = new Image();
    img.src = p.photoImg;
    if (img.decode) img.decode().catch(() => {});
  }
});
buildDots();
