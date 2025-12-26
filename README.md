# BlindTest Party

Le blindtest multijoueur instantane - Jouez sans inscription ou creez votre compte pour progresser !

## Caracteristiques

### Mode Guest
- Acces instantane, pas d'inscription
- Pseudo temporaire
- Rooms publiques et privees
- Multijoueur jusqu'a 8 joueurs

### Mode Compte
- Progression complete (XP, Niveaux)
- Badges et achievements
- Stats personnelles
- Classements (global, hebdo, amis)
- Mode solo et multijoueur
- Defi quotidien
- Defis entre amis

## Stack Technique

### Frontend
- React 18 + TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Zustand (state management)
- Socket.io Client
- React Router v6

### Backend
- Node.js + Express
- Socket.io
- Prisma ORM
- PostgreSQL
- Redis (sessions, cache)
- JWT Authentication

## Installation locale

### Prerequis
- Node.js 18+
- PostgreSQL
- Redis (optionnel)

### Configuration

1. Cloner le repository
```bash
git clone https://github.com/your-repo/blindtest-party.git
cd blindtest-party
```

2. Installer les dependances
```bash
npm install
```

3. Configurer les variables d'environnement
```bash
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env
# Editer les fichiers .env avec vos configurations
```

4. Initialiser la base de donnees
```bash
npm run db:push
```

5. Lancer le developpement
```bash
npm run dev
```

L'application sera disponible sur:
- Frontend: http://localhost:3000
- Backend: http://localhost:4000

## Deploiement

### Frontend sur Vercel

1. Connectez votre repo GitHub a Vercel
2. Configurez le projet:
   - **Framework Preset**: Vite
   - **Root Directory**: `apps/web`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

3. Ajoutez les variables d'environnement:
   - `VITE_API_URL`: URL de votre backend (ex: https://your-api.railway.app)
   - `VITE_SOCKET_URL`: Meme URL que VITE_API_URL

4. Deployez!

### Backend sur Railway

1. Connectez votre repo GitHub a Railway
2. Ajoutez un service PostgreSQL
3. Configurez le projet:
   - **Root Directory**: `apps/api`
   - **Build Command**: `npm run build`
   - **Start Command**: `npm run db:migrate:deploy && npm start`

4. Ajoutez les variables d'environnement:
   - `DATABASE_URL`: (fourni automatiquement par Railway)
   - `JWT_SECRET`: (generez une cle secrete)
   - `JWT_REFRESH_SECRET`: (generez une cle secrete)
   - `CLIENT_URL`: URL de votre frontend Vercel
   - `NODE_ENV`: `production`

5. Deployez!

### Backend sur Render

1. Connectez votre repo GitHub a Render
2. Creez un nouveau Web Service
3. Configurez:
   - **Root Directory**: `apps/api`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run db:migrate:deploy && npm start`

4. Ajoutez une base de donnees PostgreSQL
5. Configurez les variables d'environnement (voir Railway ci-dessus)
6. Deployez!

## Scripts

```bash
# Developpement
npm run dev          # Lance frontend + backend
npm run dev:web      # Lance uniquement le frontend
npm run dev:api      # Lance uniquement le backend

# Build
npm run build        # Build tous les packages

# Base de donnees
npm run db:generate  # Genere le client Prisma
npm run db:push      # Push le schema vers la BDD
npm run db:migrate   # Cree une migration
```

## Structure du projet

```
blindtest-party/
├── apps/
│   ├── web/                    # Frontend React (Vercel)
│   │   ├── src/
│   │   │   ├── components/     # Composants UI
│   │   │   ├── pages/          # Pages de l'app
│   │   │   ├── hooks/          # Custom hooks
│   │   │   ├── stores/         # Zustand stores
│   │   │   ├── lib/            # Utilitaires (api, socket)
│   │   │   └── types/          # TypeScript types
│   │   ├── vercel.json         # Config Vercel
│   │   └── ...
│   │
│   └── api/                    # Backend Node.js (Railway/Render)
│       ├── src/
│       │   ├── routes/         # API routes
│       │   ├── middleware/     # Express middleware
│       │   ├── socket/         # WebSocket handlers
│       │   └── utils/          # Utilitaires
│       ├── prisma/
│       │   └── schema.prisma   # Schema BDD
│       ├── Dockerfile          # Pour deploiement Docker
│       ├── railway.json        # Config Railway
│       └── render.yaml         # Config Render
│
└── packages/
    └── shared/                 # Types et constantes partages
```

## Variables d'environnement

### Frontend (apps/web/.env)
```
VITE_API_URL=http://localhost:4000
VITE_SOCKET_URL=http://localhost:4000
```

### Backend (apps/api/.env)
```
DATABASE_URL=postgresql://user:password@localhost:5432/blindtest_party
JWT_SECRET=your-secret-key
JWT_REFRESH_SECRET=your-refresh-secret
PORT=4000
NODE_ENV=development
CLIENT_URL=http://localhost:3000
```

## Licence

MIT
