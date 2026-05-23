# Illustrations — representation

Ce dossier est prévu pour accueillir des illustrations optionnelles.
Les photos des personnes sont chargées directement depuis Wikimedia Commons (domaine public) via les URLs définies dans `data.js`.

## Photos utilisées dans l'œuvre

| Personne | Description | Source |
|----------|-------------|--------|
| Marie Curie | Portrait, vers 1900 | Wikimedia Commons — domaine public |
| Jeanne Chauvin | Portrait, première avocate plaidante en France | Wikimedia Commons — domaine public |
| Kathrine Switzer | Dossard 261, marathon de Boston, 19 avril 1967 | Wikimedia Commons — Boston Herald / AP |
| Aujourd'hui | Image personnelle — à intégrer | Renseigner `photoImg` dans `data.js`, entrée `id: 7` |

## Pour ajouter votre propre photo (entrée "Aujourd'hui")

1. Déposez votre image dans ce dossier (ex. `aujourdhui.jpg`)
2. Dans `data.js`, trouvez l'entrée `id: 7`
3. Remplacez `photoImg: ''` par `photoImg: 'assets/images/aujourdhui.jpg'`

## Notes techniques

- Toutes les photos historiques sont du domaine public (Wikimedia Commons).
- Les URLs de chargement sont dans le tableau `pages` de `data.js` (champ `photoImg`).
- Si une URL ne répond pas, la page reste lisible — le dégradé sombre sur fond de parchemin prend le relais.
- Les photos sont affichées en `background-size: cover` sur la page gauche du spread bio, avec un dégradé sombre en superposition pour garantir la lisibilité du texte blanc.
