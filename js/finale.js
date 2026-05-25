'use strict';

/* ============================================================
   FINALE — wiring, kintsugi animation, 3D pop-up book
   ============================================================ */

function wireFinale() {
  const trigger = document.getElementById('finale-popup-trigger');
  if (trigger) {
    trigger.onclick = (e) => { e.stopPropagation(); showPopupBook(); };
  }

  const btn = document.getElementById('recommencer-btn');
  if (btn) {
    btn.onclick = () => {
      const scene3d = document.getElementById('finale-3d-scene');
      const book3d  = document.getElementById('f3d-book');
      scene3d.classList.remove('active');
      book3d.classList.remove('open');
      resetKintsugi();
      currentIndex   = 0;
      kintsugiPlayed = false;
      $('#flipbook').turn('page', 2);
    };
  }
}

function showPopupBook() {
  const scene3d = document.getElementById('finale-3d-scene');
  const book3d  = document.getElementById('f3d-book');
  if (!scene3d) return;
  scene3d.classList.add('active');
  setTimeout(() => { book3d.classList.add('open'); }, 900);
}

function resetKintsugi() {
  const cracks  = document.querySelectorAll('.kintsugi-crack');
  const cover   = document.getElementById('kintsugi-cover');
  const finText = document.getElementById('finale-text');
  const finDiv  = document.getElementById('finale-divider');
  const finQ    = document.getElementById('finale-question');
  const trigger = document.getElementById('finale-popup-trigger');

  cracks.forEach(c => {
    c.classList.remove('gold');
    c.style.transition = 'none';
    try {
      const len = c.getTotalLength ? c.getTotalLength() : 200;
      c.style.strokeDasharray  = len;
      c.style.strokeDashoffset = len;
    } catch(e) {
      c.style.strokeDasharray = c.style.strokeDashoffset = 200;
    }
  });
  if (cover)   { cover.style.transition = 'none'; cover.style.filter = ''; cover.style.opacity = '1'; }
  if (finText) { finText.classList.remove('visible'); }
  if (finDiv)  { finDiv.style.opacity = '0'; finDiv.style.transition = 'none'; }
  if (finQ)    { finQ.style.opacity = '0'; finQ.style.transition = 'none'; }
  if (trigger) { trigger.classList.remove('visible'); }
}

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

  /* Pop-up trigger button appears after kintsugi finishes */
  setTimeout(() => {
    const trigger = document.getElementById('finale-popup-trigger');
    if (trigger) trigger.classList.add('visible');
  }, 6500);
}
