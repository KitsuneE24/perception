'use strict';

/* ============================================================
   FINALE — wiring & kintsugi animation
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
