# Perception

Livre pop-up numérique interactif — HTML / CSS / JavaScript.

Une œuvre sur la perception des femmes dans l'espace public, à travers quatre parcours réels, quatre époques, quatre domaines.

## Structure

| Spread | Contenu |
|--------|---------|
| 0 | Couverture — animation SVG pop-up (œil stylisé) |
| 1–2 | Jeanne Chauvin · Droit · 1897 · France |
| 3–4 | Marie Curie · Sciences · 1911 · Pologne |
| 5–6 | Kathrine Switzer · Sport · 1967 · États-Unis |
| 7–8 | Anne Hathaway · Internet · 2026 |
| 9 | Finale — animation kintsugi |

Chaque bio occupe deux pages : photo plein-format (gauche) + citation biaisée et décodage (droite). Les spreads de transition utilisent des illustrations SVG pop-up animées.

## Fichiers

```
index.html
css/
  base.css          — variables, reset, scène
  book-intro.css    — animation 3D du livre à l'ouverture
  flipbook.css      — turn.js, pages bio, couverture
  finale.css        — animation kintsugi, page finale
  navigation.css    — barre de dots et compteur
js/
  data.js           — SVG illustrations + tableau pages[]
  book-intro.js     — ouverture du livre 3D
  flipbook.js       — turn.js init, HTML des pages, navigation
  finale.js         — animation kintsugi, lien "Recommencer"
  turn.min.js       — bibliothèque flip-page (turn.js)
assets/images/
  Jeanne_Chauvin.jpg
  marie-curie.jpg
  kathrine-switzer1.jpg
  anne_hathaway.jpg
  favicon.ico
```

## Lancer le projet

Ouvrir `index.html` dans un navigateur. Aucune dépendance à installer — jQuery et la police IM Fell English sont chargés via CDN.

> Turn.js nécessite un serveur local pour fonctionner correctement (pas de `file://`). Utiliser Live Server (VS Code) ou `npx serve .`.

## Sources

- **Jeanne Chauvin** — RetroNews / BNF · Wikipedia FR · village-justice.com
- **Marie Curie** — Nobel Prize archives · Nature (1911) · Wikiquote FR
- **Kathrine Switzer** — ESPN · NPR · kathrineswitzer.com
- **Anne Hathaway** - https://youtu.be/uidGNIp-nn4?t=174
