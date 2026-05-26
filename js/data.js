'use strict';

/* ============================================================
   ICON ILLUSTRATIONS (PNG)
   ============================================================ */

const SVG_EYE    = `<img src="assets/images/icon/perception.png" class="icon-popup" alt="perception">`;
const SVG_CURIE  = `<img src="assets/images/icon/atome.png"      class="icon-popup" alt="atome">`;
const SVG_CHAUVIN= `<img src="assets/images/icon/law.png"         class="icon-popup" alt="law">`;
const SVG_SWITZER= `<img src="assets/images/icon/running.png"     class="icon-popup" alt="running">`;
const SVG_HATHAWAY = `<img src="assets/images/icon/moving.png"      class="icon-popup" alt="moving">`;

/* ============================================================
   PAGES — 10 spreads:
   0  Cover
   1  Bio Jeanne Chauvin     (left: photo / right: quote)
   2  Transition Chauvin → Curie   (both: popup icons)
   3  Bio Marie Curie
   4  Transition Curie → Switzer
   5  Bio Kathrine Switzer
   6  Transition Switzer → Hathaway
   7  Bio Anne Hathaway
   8  Transition Hathaway → Finale
   9  Finale
   ============================================================ */

const pages = [

  /* 0 — COVER */
  {
    id: 0, type: 'cover', era: 'ancient',
    svgPopup: SVG_EYE, labelPopup: 'Perception'
  },

  /* 1 — BIO Jeanne Chauvin */
  {
    id: 1, type: 'bio', era: 'transition',
    year: '1897', domain: 'Droit', location: 'France', name: 'Jeanne Chauvin',
    description: 'Elle a étudié le droit. Elle a voulu le plaider. On lui a dit non.<br>Elle a plaidé quand même.',
    biasQuote: 'la profession d\'avocat étant depuis toujours un office viril',
    biasQuoteAttrib: '— Cour d\'appel de Paris, 30 novembre 1897',
    decode: 'C\'est pas un titre. C\'est une porte.</b><br>En entrant dans ce prétoire, Chauvin ne demandait pas la permission d\'exister dans le droit — elle le faisait, là où aucune n\'avait osé avant. Et ce faisant, <b>elle ne prouvait pas que c\'était possible : elle rendait absurde que ça ne l\'ait pas été.</b>',
    photoImg: 'assets/images/bio/Jeanne_Chauvin.jpg',
    photoCaption: 'Jeanne Chauvin, première avocate plaidante'
  },

  /* 2 — TRANSITION Chauvin → Curie*/
  {
    id: 2, type: 'transition', era: 'ancient',
    svgLeft: SVG_CHAUVIN, labelLeft: 'Droit',
    svgRight: SVG_CURIE,  labelRight: 'Science'
  },

  /* 3 — BIO Marie Curie*/
  {
    id: 3, type: 'bio', era: 'ancient',
    year: '1911', domain: 'Sciences', location: 'Pologne', name: 'Marie Curie',
    description: 'Elle ne cherchait pas à prouver qu\'elle pouvait. Elle cherchait à comprendre le monde. Deux Nobel plus tard, plus personne ne doutait de sa légitimité.',
    biasQuote: 'there was, in its opinion, an immutable tradition against the election of women, which it seemed eminently wise to respect.',
    biasQuoteAttrib: '— Institut de France, débat rapporté par Nature, 1911',
    decode: 'L\'Académie a voté. La tradition a prévalu. Curie a persévéré.<br>Il n\'y a pas de réponse plus simple à donner à ceux qui ferment les portes : <b>persévérer, jusqu\'à ce que la preuve soit plus grande que le préjugé.</b>',
    photoImg: 'assets/images/bio/marie-curie.jpg',
    photoCaption: 'Maria Skłodowska, vers 1900'
  },

  /* 4 — TRANSITION Curie → Switzer */
  {
    id: 4, type: 'transition', era: 'transition',
    svgLeft: SVG_CHAUVIN,  labelLeft: 'Droit',
    svgRight: SVG_SWITZER, labelRight: 'Sport'
  },

  /* 5 — BIO Kathrine Switzer */
  {
    id: 5, type: 'bio', era: 'modern',
    year: '1967', domain: 'Sport', location: 'États-Unis', name: 'Kathrine Switzer',
    description: 'Dossard 261. Le directeur de course tente de l\'arracher. Elle a continué de courir.',
    biasQuote: 'Get the hell out of my race and give me those numbers!',
    biasQuoteAttrib: '— Jock Semple, Boston Athletic Association, Marathon de Boston, 19 avril 1967',
    decode: 'Une seule course. Une seule photo.<br>Et cette image a couru plus loin qu\'elle — autour du monde, et dans le temps. Switzer a continué de se battre jusqu\'en 1972, année où le marathon de Boston ouvre officiellement ses portes aux femmes. <b>L\’action est le moteur du changement.</b>',
    photoImg: 'assets/images/bio/kathrine-switzer1.jpg',
    photoCaption: 'Kathrine Switzer, dossard 261, Boston 1967'
  },

  /* 6 — TRANSITION Switzer → Anne Hathaway */
  {
    id: 6, type: 'transition', era: 'modern',
    svgLeft: SVG_SWITZER,   labelLeft: 'Sport',
    svgRight: SVG_HATHAWAY, labelRight: 'Expression'
  },

  /* 7 — BIO Anne Hathaway */
  {
    id: 7, type: 'bio', era: 'contemporary',
    year: '2026', domain: 'Cinéma', location: 'États-Unis', name: 'Anne Hathaway',
    description: '«they chose action in a world that expects silence.»<br>Elles ont choisi d\'agir dans un monde qui attend qu\'on se taise.',
    biasQuote: 'our choosing to celebrate today does not signal that we are here to accommodate injustice. No, our celebration today affirms our determination to outlast it.',
    biasQuoteAttrib: '— ONU – Journée internationale des droits des femmes,2026',
    decode: 'L\'espace public n\'est plus seulement une salle d\'audience ou un starting-block.<br> Il est partout — et partout, il se rejoue la même question : cette présence est-elle reconnue ? Cette voix est-elle entendue ? <b> Les réponses se construisent encore, portées par les avancées d\’hier et les engagements d\’aujourd\’hui.</b>',
    photoImg: 'assets/images/bio/anne_hathaway.jpg',
    photoCaption: 'Journée internationale des droits des femmes, 2026'
  },

  /* 8 — TRANSITION Anne Hathaway → Finale */
  {
    id: 8, type: 'transition', era: 'contemporary',
    svgLeft: SVG_HATHAWAY, labelLeft: 'Expression',
    svgRight: SVG_EYE,     labelRight: 'Perception'
  },

  /* 9 — FINALE */
  { id: 9, type: 'finale', era: 'finale' }

];
