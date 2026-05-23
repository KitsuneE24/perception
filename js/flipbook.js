'use strict';

/* ============================================================
   STATE
   ============================================================ */
let currentIndex   = 0;
let kintsugiPlayed = false;

/* ============================================================
   DOM
   ============================================================ */
const spreadCtr    = document.getElementById('spread-counter');
const dotContainer = document.getElementById('dot-indicators');

/* ============================================================
   ERA COLORS
   ============================================================ */
const eraColors = {
  ancient:      'var(--parchment-ancient)',
  transition:   'var(--parchment-transition)',
  modern:       'var(--parchment-modern)',
  contemporary: 'var(--parchment-contemporary)',
  finale:       'var(--parchment-finale)'
};

/* ============================================================
   DOTS
   ============================================================ */
const DOT_DEFS = [
  { label: 'Couverture',   ids: [0]    },
  { label: 'J. Chauvin',   ids: [1, 2] },
  { label: 'Marie Curie',  ids: [3, 4] },
  { label: 'K. Switzer',   ids: [5, 6] },
  { label: 'Aujourd\'hui', ids: [7, 8] },
  { label: 'Épilogue',     ids: [9]    },
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
      d.className = 'dot';
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

  // Slot 1: front-cover placeholder — shows the cover design
  pageHtml.push('<div class="page" style="background:var(--cover-color-dark)">' + coverLeftHTML() + '</div>');
  // Slot 2: blank cover — left page of the opening spread
  pageHtml.push('<div class="page" style="background:var(--cover-color-dark)"></div>');
  // Slot 3: cover-right quote page — right page of the opening spread
  pageHtml.push(
    '<div class="page" style="background:' + (eraColors[pages[0].era] || 'var(--parchment-ancient)') + '">' +
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

  $('#flipbook').turn({
    width:        900,
    height:       600,
    autoCenter:   true,
    display:      'double',
    acceleration: true,
    gradients:    true,
    elevation:    50,
    corners:      'all',
    when: {
      turning: function() {
        // Collapse visible popups as the page starts to turn
        $('#flipbook .popup-element.visible')
          .removeClass('visible').addClass('collapsing');
        setTimeout(function() {
          $('#flipbook .popup-element.collapsing').removeClass('collapsing');
        }, 180);
      },
      turned: function(e, page) {
        // slot 2+3 = opening spread (index 0), slot 4+5 = pages[1], etc.
        currentIndex = Math.max(0, Math.floor((page - 2) / 2));
        spreadCtr.textContent = (currentIndex + 1) + ' / ' + pages.length;
        updateDots();

        // Animate popup elements on the newly visible spread
        $('#flipbook .popup-element').removeClass('visible');
        $('.p' + page + ', .p' + (page + 1))
          .find('.popup-element')
          .each(function(i) {
            var $el = $(this);
            setTimeout(function() { $el.addClass('visible'); }, i * 200);
          });

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

  // Animate popups on the opening spread
  $('.p2, .p3').find('.popup-element').each(function(i) {
    var $el = $(this);
    setTimeout(function() { $el.addClass('visible'); }, i * 200);
  });

  // Click right half → next, click left half → previous.
  // If the mousedown was inside a turn.js corner area, skip the click handler
  // entirely so turn.js can own the interaction (prevents double-turning).
  var _ptrDownX = 0, _ptrDownY = 0, _cornerDown = false;

  function _isFlipCorner(pageX, pageY) {
    var $fb = $('#flipbook');
    var off = $fb.offset();
    var x   = pageX - off.left;
    var y   = pageY - off.top;
    var cs  = 100;             // must match turn.js cornerSize default
    var w   = $fb.width();
    var h   = $fb.height();
    if (y > cs && y < h - cs) return false; // not near top/bottom edge
    if (x < w / 2) return x <= cs;          // left page: left corners (bl, tl)
    return x >= w - cs;                      // right page: right corners (br, tr)
  }

  $('#flipbook')
    .on('pointerdown', function(e) {
      _ptrDownX   = e.clientX;
      _ptrDownY   = e.clientY;
      _cornerDown = _isFlipCorner(e.pageX, e.pageY);
    })
    .on('click', function(e) {
      if (_cornerDown) return; // turn.js owns corner click/drag — don't double-turn
      if (Math.abs(e.clientX - _ptrDownX) > 8 ||
          Math.abs(e.clientY - _ptrDownY) > 8) return;
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
                <path d="M8 44 Q44 16 80 44 Q44 72 8 44 Z" fill="rgba(107,45,139,0.4)" stroke="rgba(212,169,106,0.85)" stroke-width="1.8" stroke-linecap="round"/>
                <path d="M20 36 Q44 24 68 36" fill="none" stroke="rgba(212,169,106,0.28)" stroke-width="0.9"/>
                <circle cx="44" cy="44" r="16" fill="rgba(212,169,106,0.08)" stroke="rgba(212,169,106,0.72)" stroke-width="1.5"/>
                <path d="M44 28 C48 34 48 39 44 44 C40 39 40 34 44 28" fill="rgba(212,169,106,0.14)" stroke="rgba(212,169,106,0.42)" stroke-width="0.9"/>
                <path d="M44 60 C48 54 48 49 44 44 C40 49 40 54 44 60" fill="rgba(212,169,106,0.14)" stroke="rgba(212,169,106,0.42)" stroke-width="0.9"/>
                <circle cx="44" cy="44" r="7" fill="rgba(107,45,139,0.92)" stroke="rgba(212,169,106,0.55)" stroke-width="1"/>
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
      <div class="finale-message">La perception se forge.<br>Grâce à elles. Grâce à nous.</div>
      <div class="finale-names">
        Jeanne Chauvin · Droit · 1897<br>
        Marie Curie · Sciences · 1911<br>
        Kathrine Switzer · Sport · 1967<br>
        Anne Hathaway · Internet · 2026<br>
        <em>Et toutes celles dont on n'a pas encore écrit le nom.</em>
      </div>
      <div class="finale-central-message">
        Ces exemples montrent une évolution réelle : les femmes ont progressivement accédé à des espaces autrefois fermés dans le droit, la science ou le sport. Les formes de résistance n’ont pas disparu, mais elles ont changé de nature, accompagnant l’ouverture progressive des institutions et des pratiques sociales.
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
    <div class="bio-year-shadow">${page.year}</div>
    <div class="bio-right-content">
      <p class="bio-right-tag">Perceptions et réactions</p>
      <blockquote class="bio-quote">${page.biasQuote}</blockquote>
      ${page.biasQuoteAttrib ? `<p class="bio-quote-attrib">${page.biasQuoteAttrib}</p>` : ''}
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
        <div class="kintsugi-book-cover" id="kintsugi-cover">
          <div style="
            position: absolute;
            top: 0; left: 0;
            width: 450px; height: 600px;
            transform: scale(0.444);
            transform-origin: top left;
            pointer-events: none;
          ">
            ${coverLeftHTML()}
          </div>
        </div>
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
        <div class="finale-line1">La perception se forge.</div>
        <div class="finale-line2">Grâce à elles. Grâce à nous.</div>
        <div class="finale-divider" id="finale-divider" style="opacity:0;margin:12px auto;"></div>
        <div class="finale-question" id="finale-question" style="opacity:0;">
          Chaque perception qui change<br>marque un tournant.
        </div>
      </div>
    </div>`;
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
