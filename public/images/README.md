# Photos du site

Déposez ici les photos (JPG, PNG ou WebP ; 1600 px de large conseillé), puis renseignez
le champ `image` correspondant dans `data/site.ts` :

- Hero : `heroPhoto.image`, ex. `/images/hero-curtis.jpg` (format vertical)
- Équipe : `team[i].image`, ex. `/images/team-curtis.jpg` (format 3:4)
- Réalisations : `gallery[i].image` et `gallery[i].alt`, ex. `/images/taper-01.jpg`

Tant qu'un champ `image` est vide, un placeholder animé s'affiche à la place.
