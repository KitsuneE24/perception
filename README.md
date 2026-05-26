# Perception

Livre pop-up numérique interactif — HTML / CSS / JavaScript.

Une œuvre sur la perception des femmes dans l'espace public, à travers quatre parcours réels, quatre époques, quatre domaines. Ce n'est pas une dénonciation — c'est une célébration du chemin parcouru.

## Structure narrative

| Spread | Contenu |
|--------|---------|
| 0 | Couverture — illustration pop-up (œil stylisé) |
| 1 | Bio Jeanne Chauvin · Droit · 1897 · France |
| 2 | Transition Chauvin → Curie (icônes animées) |
| 3 | Bio Marie Curie · Sciences · 1911 · Pologne |
| 4 | Transition Curie → Switzer (icônes animées) |
| 5 | Bio Kathrine Switzer · Sport · 1967 · États-Unis |
| 6 | Transition Switzer → Hathaway (icônes animées) |
| 7 | Bio Anne Hathaway · Cinéma · 2026 |
| 8 | Transition Hathaway → Finale (icônes animées) |
| 9 | Finale — animation kintsugi + invitation au récit |

Chaque bio occupe deux pages : photo plein-format (gauche) + citation biaisée et décodage (droite). Les spreads de transition affichent deux icônes animées en pop-up, une par page.

## Séquence finale (spread 9)

1. L'animation kintsugi dessine des fissures dorées sur la couverture du livre ; le texte final apparaît progressivement.
2. La question « Et votre nom dans ce récit ? » invite le visiteur à ajouter son nom à la liste affichée sur la page gauche.

## Fichiers

```
index.html
css/
  base.css          — variables design, reset, scène
  book-intro.css    — animation 3D du livre à l'ouverture
  flipbook.css      — turn.js, pages bio, couverture
  finale.css        — kintsugi, zone interaction nom
  navigation.css    — barre de dots et compteur de spread
js/
  data.js           — illustrations PNG + tableau pages[]
  book-intro.js     — ouverture du livre 3D
  flipbook.js       — turn.js init, HTML des pages, navigation clavier/clic
  finale.js         — wireFinale, playKintsugi, playGoldParticles
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

- **Clic moitié droite** du livre → page suivante
- **Clic moitié gauche** → page précédente
- **Glisser les coins** → animation de feuilletage
- **Flèches clavier** → navigation entre les spreads
- **Points de navigation** (bas de page) → accès direct à chaque section

## Sources

- **Jeanne Chauvin** — RetroNews / BNF · Wikipedia FR · village-justice.com
- **Marie Curie** — Nobel Prize archives · Nature (1911) · Wikiquote FR
- **Kathrine Switzer** — ESPN · NPR · kathrineswitzer.com
- **Anne Hathaway** — ONU, Journée internationale des droits des femmes 2026
