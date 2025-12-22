# 🍱 Bento - Link in Bio Platform

A modern, full-stack Bento.me clone built with Next.js 14, TypeScript, and Tailwind CSS. Create beautiful, customizable link-in-bio pages with a drag-and-drop grid editor.

## ✨ Features

- **Drag & Drop Editor**: Intuitive grid-based editor with react-grid-layout
- **Smart Widgets**: Multiple widget types with rich previews
- **Responsive Design**: Mobile-first, works on all devices
- **Dark/Light Theme**: Built-in theme support
- **Auto-save**: Changes are automatically saved
- **Fast & Modern**: Built with Next.js 14 App Router

## 🚀 Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + CSS Variables
- **State**: Zustand
- **Animations**: Framer Motion
- **Drag & Drop**: react-grid-layout

### Backend
- **Runtime**: Node.js
- **Database**: PostgreSQL (via Prisma)
- **Auth**: NextAuth.js
- **API**: Next.js API Routes

## 📦 Project Structure

```
src/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   └── register/
│   ├── (dashboard)/
│   │   └── editor/
│   ├── [username]/          # Public profile pages
│   ├── demo/                 # Demo page
│   ├── api/
│   │   ├── auth/
│   │   ├── bento/
│   │   ├── oembed/
│   │   └── upload/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── editor/
│   │   ├── BentoEditor.tsx
│   │   ├── WidgetPicker.tsx
│   │   └── WidgetSettings.tsx
│   ├── widgets/
│   │   ├── LinkWidget.tsx
│   │   ├── ImageWidget.tsx
│   │   ├── TextWidget.tsx
│   │   ├── SpotifyWidget.tsx
│   │   ├── YouTubeWidget.tsx
│   │   ├── GitHubWidget.tsx
│   │   └── ...
│   └── public/
│       └── BentoPage.tsx
├── lib/
│   ├── db.ts
│   ├── auth.ts
│   ├── oembed.ts
│   └── utils.ts
├── hooks/
│   └── useAutoSave.ts
├── store/
│   └── editorStore.ts
├── types/
│   └── index.ts
└── prisma/
    └── schema.prisma
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- npm or yarn

### Installation

1. **Clone and install dependencies**
   ```bash
   git clone <repository-url>
   cd bento-clone
   npm install
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your database URL and OAuth credentials.

3. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000)**

## 🎯 Available Widgets

| Widget | Type | Description |
|--------|------|-------------|
| Link | Basic | Add links with preview |
| Text | Basic | Custom text content |
| Image | Basic | Upload or embed images |
| Twitter/X | Social | Profile link |
| Instagram | Social | Profile link |
| LinkedIn | Social | Profile link |
| GitHub | Social | Profile with stats |
| YouTube | Media | Embed videos |
| Spotify | Media | Embed tracks/playlists |
| Twitch | Media | Stream link |
| Dribbble | Design | Portfolio link |
| Behance | Design | Portfolio link |
| Figma | Design | Design link |
| Medium | Writing | Blog link |
| Substack | Writing | Newsletter link |
| Buy Me a Coffee | Support | Donation link |
| Patreon | Support | Subscription link |

## 📝 Scripts

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # Run ESLint
npm run db:push    # Push Prisma schema to database
npm run db:studio  # Open Prisma Studio
```

## 🔧 Configuration

### Environment Variables

```env
# Database
DATABASE_URL="postgresql://..."

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret"

# OAuth (optional)
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
```

### Theme Customization

Edit CSS variables in `src/app/globals.css`:

```css
:root {
  --color-primary: #0066cc;
  --widget-radius: 16px;
  --grid-gap: 16px;
}

.dark {
  --color-bg: #0a0a0a;
  --widget-bg: #1c1c1e;
}
```

## 🌐 Deployment

### Vercel (Recommended)

```bash
npm i -g vercel
vercel
```

### Docker

```bash
docker build -t bento-clone .
docker run -p 3000:3000 bento-clone
```

## 📱 Demo

Visit `/demo` to see a sample Bento page without authentication.

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines.

## 📄 License

MIT License - feel free to use for personal and commercial projects.

---

Built with ❤️ using Next.js and Tailwind CSS
