# Prestavice

Plateforme de mise en relation entre clients et artisans au Cameroun.

## Stack

- React 18 + Vite
- React Router DOM
- CSS pur (variables CSS, pas de framework)
- lucide-react pour les icônes

## Démarrage

```bash
npm install
npm run dev
```

L'application démarre sur `http://localhost:5173`.

## Build de production

```bash
npm run build
npm run preview
```

## Structure

```
src/
├── components/    # Composants réutilisables (Navbar, ArtisanCard, Sidebar, ...)
├── pages/         # Toutes les pages de l'application
├── layouts/        # Layouts (public, auth)
├── context/        # AuthContext (authentification simulée en mémoire)
├── data/           # Données mock (artisans, catégories, avis, demandes...)
└── styles/         # Design tokens et styles globaux
```
