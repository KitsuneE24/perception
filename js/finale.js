'use strict';

/* ============================================================
   FINALE — kintsugi animation + particules dorées + interaction nom
   ============================================================ */

function wireFinale() {
  const wrap  = document.getElementById('finale-input-wrap');
  const input = document.getElementById('finale-name-input');
  const btn   = document.getElementById('finale-name-btn');

  if (!wrap || !input || !btn) return;

  // Empêche les clics dans la zone input de tourner les pages
  wrap.addEventListener('click',       e => e.stopPropagation());
  wrap.addEventListener('pointerdown', e => e.stopPropagation());

  function submitName() {
    const name = input.value.trim();
    if (!name) return;

    const namesList = document.querySelector('#flipbook .finale-names');
    if (namesList) {
      const em = namesList.querySelector('em');
      const newEntry = document.createElement('span');
      newEntry.className = 'finale-new-name';
      newEntry.textContent = name;
      if (em) {
        namesList.insertBefore(newEntry, em);
      } else {
        namesList.appendChild(newEntry);
      }
      requestAnimationFrame(() => newEntry.classList.add('visible'));
    }

    input.value       = '';
    input.placeholder = 'Nom ajouté ✦';
    input.disabled    = true;
    btn.disabled      = true;
  }

  btn.addEventListener('click', submitName);
  input.addEventListener('keydown', e => { if (e.key === 'Enter') submitName(); });
}

function playKintsugi() {
  const cracks  = document.querySelectorAll('.kintsugi-crack');
  const cover   = document.getElementById('kintsugi-cover');
  const finText = document.getElementById('finale-text');
  const finDiv  = document.getElementById('finale-divider');
  const finQ    = document.getElementById('finale-question');
  const finInp  = document.getElementById('finale-input-wrap');

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

  setTimeout(() => {
    cracks.forEach(c => c.classList.add('gold'));
    cover.style.filter = 'brightness(1.05)';
    playGoldParticles();
  }, 1600);

  setTimeout(() => { cover.style.opacity = '0.15'; finText.classList.add('visible'); }, 2800);
  setTimeout(() => { finDiv.style.transition = 'opacity 0.6s ease'; finDiv.style.opacity = '1'; }, 4200);
  setTimeout(() => { finQ.style.transition   = 'opacity 1s ease';   finQ.style.opacity   = '1'; }, 5000);
  setTimeout(() => {
    if (finInp) { finInp.style.transition = 'opacity 1s ease'; finInp.style.opacity = '1'; }
    // Pulse "Et toutes celles…" sur la page gauche pour relier visuellement les deux
    const em = document.querySelector('#flipbook .finale-names em');
    if (em) em.classList.add('finale-em-pulse');
  }, 6500);
}

/* ============================================================
   PARTICULES DORÉES — canvas animation
   ============================================================ */
function playGoldParticles() {
  const canvas = document.getElementById('gold-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width  = 200;
  canvas.height = 275;

  // Points source en pixels canvas (SVG 220×300 → canvas 200×275)
  const sources = [
    [100, 138], [127,  91], [ 68, 101],
    [118, 174], [ 77, 183], [154, 142],
    [ 46, 132], [100,  40], [143, 235], [ 57, 243]
  ];

  const particles = [];

  function spawn() {
    const src = sources[Math.floor(Math.random() * sources.length)];
    particles.push({
      x:     src[0] + (Math.random() - 0.5) * 22,
      y:     src[1] + (Math.random() - 0.5) * 22,
      vx:    (Math.random() - 0.5) * 1.2,
      vy:    -(Math.random() * 1.8 + 0.4),
      size:  0.8 + Math.random() * 2,
      life:  1,
      decay: 0.006 + Math.random() * 0.01,
    });
  }

  let frame = 0;

  (function loop() {
    ctx.clearRect(0, 0, 200, 275);

    // Burst initial dense, puis s'estompe
    if (frame < 200) {
      const count = frame < 60 ? 3 : frame < 120 ? 2 : 1;
      for (let i = 0; i < count; i++) spawn();
    }

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x  += p.vx;
      p.y  += p.vy;
      p.vy *= 0.98; // décélération douce
      p.life -= p.decay;
      if (p.life <= 0) { particles.splice(i, 1); continue; }

      // Point doré
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(200,146,42,${p.life})`;
      ctx.fill();

      // Halo doux
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * 2.5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(212,169,106,${p.life * 0.25})`;
      ctx.fill();
    }

    frame++;
    if (particles.length > 0 || frame < 200) {
      requestAnimationFrame(loop);
    } else {
      ctx.clearRect(0, 0, 200, 275);
    }
  })();
}
