# Attia Froid — Site Vitrine + Admin

Projet de stage : site vitrine pour Attia Froid (équipements professionnels
Cafeteria/Fast-food/Boulangerie/Hôtellerie), avec espace admin, recherche
avancée, devis en ligne, avis clients, IA et localisation.

Design system : **Arctic Precision** (voir `design/stitch/arctic_precision/DESIGN.md`)
— dark mode par défaut, cyan `#2EC4E0` / jaune `#FFED66`, Montserrat + Inter + Space Mono.

## Structure du repo

```
attia-froid/
├── frontend/          → React + Vite (prêt à lancer, voir ci-dessous)
├── backend-plan/       → Fichiers Laravel prêts à copier dans un vrai projet Laravel
└── design/stitch/      → Écrans de référence générés (captures + code HTML Stitch)
```

## 1. Frontend (React + Vite) — déjà fonctionnel

```bash
cd frontend
npm install
npm run dev
```

Le site tourne sur `http://localhost:5173`. Pages déjà codées :
- **Accueil** (`src/pages/Home.jsx`) — conversion complète du design Stitch
- **Navbar** avec toggle dark/light, **Footer**, **Chatbot IA** (placeholder, à brancher)
- **Login Admin** (`src/pages/admin/AdminLogin.jsx`) — formulaire + logique de redirection
- **Layout Admin** avec sidebar (`src/layouts/AdminLayout.jsx`, `src/components/admin/AdminSidebar.jsx`)
- Toutes les autres pages (Catalogue, Fiche produit, Devis, Avis, Contact, Dashboard,
  Gestion Produits/Arrivages/Devis/Avis, Paramètres) sont créées en **stub** —
  chaque fichier indique le design de référence à convertir. On les fera une par une.

Le routing complet est déjà câblé dans `src/App.jsx`.

## 2. Backend (Laravel) — à créer localement

Le sandbox de développement ici n'a pas PHP/Composer, donc le backend ne peut
pas être généré automatiquement dans cette conversation. Étapes à faire sur
ta machine (ou le VPS) :

```bash
composer create-project laravel/laravel backend
cd backend
composer require laravel/sanctum
php artisan install:api   # ou config manuelle de Sanctum
```

Puis copie le contenu de `backend-plan/` dans `backend/` (les chemins
correspondent exactement : `app/Models/`, `app/Http/Controllers/Api/`,
`database/migrations/`, `routes/api.php`).

```bash
php artisan migrate
php artisan serve   # tourne sur http://localhost:8000
```

Le frontend est déjà configuré (`vite.config.js`) pour proxier `/api` vers
`http://localhost:8000` en dev.

### Modèles créés
- `Product` — référence, nom, catégorie, prix, statut de stock, nouveauté, images, specs
- `QuoteRequest` — demandes de devis (avec statut nouveau/traité/archivé)
- `Review` — avis clients (avec modération `is_approved`)
- `Admin` — table dédiée pour l'auth admin (séparée des futurs users clients)

### Routes API déjà définies (`routes/api.php`)
Publiques : `GET /products` (avec `search`, `category`, `in_stock`), `GET /products/{id}`,
`POST /devis`, `GET /avis`, `POST /avis`, `POST /admin/login`.
Protégées (Sanctum) : CRUD produits, gestion devis, modération avis.

## 3. Prochaines étapes suggérées

1. Créer le projet Laravel localement + lancer les migrations
2. Connecter `Catalogue.jsx` à `GET /api/products` avec les filtres de recherche avancée
3. Convertir les écrans admin un par un (Dashboard → Produits → Arrivages → Devis → Avis → Paramètres)
4. Brancher le Chatbot sur Ollama (ou Groq en fallback) via un endpoint `POST /api/chat`
5. Ajouter la carte de localisation (Leaflet) sur la page Contact
6. Déploiement (VPS avec Ollama, ou Vercel/Railway + Groq selon le choix budget)
