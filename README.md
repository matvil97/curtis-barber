# Curtis Barber — site vitrine

Site d'une page pour Curtis Barber, barbershop au 39 rue Molière, 69006 Lyon.
Next.js 16 (App Router), TypeScript, Tailwind CSS 4, Framer Motion.

## Démarrer

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de production
npm run start    # sert le build
```

## Modifier le contenu

Tout le contenu éditable est dans [`data/site.ts`](data/site.ts) :

- `salon` : adresse, téléphone, **lien Planity** et **lien Instagram** (à remplacer par les vraies URL) ;
- `services` : prestations, durées et prix (placeholders `[XX €]` à compléter) ;
- `team`, `gallery`, `heroPhoto` : portraits et photos (voir ci-dessous) ;
- `reviews` : avis clients (placeholders à remplacer par de vrais avis Google ou Planity) ;
- `hours` : horaires d'ouverture, utilisés par le voyant « Ouvert maintenant » et le JSON-LD.

## Ajouter les photos

Déposez les fichiers dans [`public/images`](public/images) puis renseignez le champ `image`
correspondant dans `data/site.ts` (ex. `image: "/images/team-curtis.jpg"`). Tant qu'un champ
est vide, un placeholder animé s'affiche.

## Déployer sur Vercel

Importez le dépôt sur Vercel, sans configuration particulière. Une fois le nom de domaine
branché, ajoutez la variable d'environnement `NEXT_PUBLIC_SITE_URL` (ex. `https://curtisbarber.fr`) :
elle sert aux URL canoniques, à l'image Open Graph, au sitemap et aux données structurées.

## Structure

```
app/            layout (polices, SEO, JSON-LD), page, image OG, icône, robots, sitemap, mentions légales
components/     une section par fichier, et ui/ pour les briques communes
data/site.ts    tout le contenu éditable
lib/hours.ts    calcul d'ouverture (fuseau Europe/Paris)
public/images/  photos du site
```
