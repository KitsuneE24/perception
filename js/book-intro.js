'use strict';

/* ============================================================
   3D BOOK INTRO
   ============================================================ */
const bookIntro = document.getElementById('book-intro');
const openBtn   = document.getElementById('open-btn');
const bookFlat  = document.getElementById('book-flat');

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
