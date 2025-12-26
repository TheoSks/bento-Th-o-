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

## Installation

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
# Editer apps/api/.env avec vos configurations
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
│   ├── web/                    # Frontend React
│   │   ├── src/
│   │   │   ├── components/     # Composants UI
│   │   │   ├── pages/          # Pages de l'app
│   │   │   ├── hooks/          # Custom hooks
│   │   │   ├── stores/         # Zustand stores
│   │   │   ├── lib/            # Utilitaires
│   │   │   └── types/          # TypeScript types
│   │   └── ...
│   │
│   └── api/                    # Backend Node.js
│       ├── src/
│       │   ├── routes/         # API routes
│       │   ├── middleware/     # Express middleware
│       │   ├── socket/         # WebSocket handlers
│       │   └── utils/          # Utilitaires
│       └── prisma/
│           └── schema.prisma   # Schema BDD
│
└── packages/
    └── shared/                 # Types et constantes partages
```

## Licence

MIT
