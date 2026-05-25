# Perception

Livre pop-up numérique interactif — HTML / CSS / JavaScript.

Une œuvre sur la perception des femmes dans l'espace public, à travers quatre parcours réels, quatre époques, quatre domaines.

## Structure narrative

| Spread | Contenu |
|--------|---------|
| 0 | Couverture — illustration pop-up (œil stylisé) |
| 1–2 | Jeanne Chauvin · Droit · 1897 · France |
| 3–4 | Marie Curie · Sciences · 1911 · Pologne |
| 5–6 | Kathrine Switzer · Sport · 1967 · États-Unis |
| 7–8 | Anne Hathaway · Internet · 2026 |
| 9 | Finale — animation kintsugi → livre pop-up 3D |

Chaque bio occupe deux pages : photo plein-format (gauche) + citation biaisée et décodage (droite). Les spreads de transition utilisent des illustrations pop-up animées (icônes PNG). La page finale enchaîne deux séquences : l'animation kintsugi puis une scène de livre pop-up 3D.

## Séquence finale (spread 9)

1. L'animation kintsugi dessine des fissures dorées sur la couverture du livre, le texte final apparaît progressivement.
2. Un bouton « ✦ Voir la suite » surgit depuis la page (animation pop-up).
3. Le clic déclenche une scène plein-écran : un livre pop-up 3D vu du dessus s'ouvre — les couvertures s'écartent, une arche centrale et des silhouettes surgissent des pages, deux photos des femmes se lèvent comme des figurines.
4. Un bouton « Recommencer » ramène au début du livre.

## Fichiers

```
index.html
css/
  base.css          — variables design, reset, scène
  book-intro.css    — animation 3D du livre à l'ouverture
  flipbook.css      — turn.js, pages bio, couverture
  finale.css        — kintsugi, bouton trigger, scène pop-up 3D
  navigation.css    — barre de dots et compteur de spread
js/
  data.js           — illustrations PNG + tableau pages[]
  book-intro.js     — ouverture du livre 3D
  flipbook.js       — turn.js init, HTML des pages, navigation clavier/clic
  finale.js         — kintsugi, showPopupBook, resetKintsugi, Recommencer
  turn.min.js       — bibliothèque flip-page (turn.js v4)
assets/images/
  bio/
    Jeanne_Chauvin.jpg
    marie-curie.jpg
    kathrine-switzer1.jpg
    anne_hathaway.jpg
  icon/
    perception.png  — œil (couverture, transition finale)
    law.png         — balance (Chauvin)
    atome.png       — orbites (Curie)
    running.png     — course (Switzer)
    moving.png      — miroir (Hathaway / contemporain)
  favicon.ico
```

## Lancer le projet

Ouvrir `index.html` dans un navigateur. Aucune dépendance à installer — jQuery et la police EB Garamond sont chargés via CDN.

> Turn.js nécessite un serveur local pour fonctionner correctement (pas de `file://`). Utiliser Live Server (VS Code) ou `npx serve .`.

## Navigation

- **Clic droit** sur le livre → page suivante
- **Clic gauche** → page précédente
- **Glisser les coins** → animation de feuilletage
- **Flèches clavier** → navigation entre les spreads
- **Points de navigation** (bas de page) → accès direct à chaque section

## Sources

- **Jeanne Chauvin** — RetroNews / BNF · Wikipedia FR · village-justice.com
- **Marie Curie** — Nobel Prize archives · Nature (1911) · Wikiquote FR
- **Kathrine Switzer** — ESPN · NPR · kathrineswitzer.com
- **Anne Hathaway** — ONU, Journée internationale des droits des femmes 2026 : https://youtu.be/uidGNIp-nn4?t=174
