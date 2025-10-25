<!--
  Enhanced README for Nexora Chat App
  Crafted from the user's content: improved structure, developer notes, and clearer setup steps.
-->

# Nexora Chat App

A real-time, multi-platform chat app built for the next era — by T. Abdul Kalam Azad.

[Live demo](https://nexora-chat-app-two.vercel.app/) · Built with React, Vite, Firebase, Cloudinary

---

## Quick overview

Nexora brings WhatsApp/Discord-grade features to the web with a modern, fast, and privacy-first approach. Realtime messaging, secure media uploads, clean responsive UI, and developer-friendly architecture make it easy to extend and deploy.

## Table of contents

1. [Tech stack](#tech-stack)
2. [Highlights / Features](#highlights--features)
3. [Folder structure](#folder-structure)
4. [Getting started (local)](#getting-started-local)
5. [Deployment](#deployment)
6. [Security](#security)
7. [Implementation notes](#implementation-notes)
8. [Roadmap](#roadmap)
9. [Contributing & Contact](#contributing--contact)

---

## Tech stack

- Frontend: React 18 + Vite
- Styling: Tailwind CSS + custom CSS, Framer Motion for animation
- Icons & UX: React Icons, Emoji Mart, React Hot Toast
- State & routing: React Context + React Router
- Database: Firebase Firestore (real-time listeners)
- Auth: Firebase Authentication
- Media: Cloudinary for secure uploads and CDN
- Hosting / CI: Vercel (GitHub -> Vercel automatic deployments)

---

## Highlights / Features

- Full authentication flows (signup, login, password reset)
- Real-time messaging with Firestore listeners
- Typing indicators, message statuses (sent/delivered/read)
- Last seen & presence tracking
- Block / unblock system enforced in DB rules
- Rich profiles: avatars (Cloudinary), themes, statuses
- Media sharing: drag & drop, attach, inline previews
- Emoji picker and message reactions (planned)
- Mobile-first, responsive UI for small screens
- Accessibility-minded: keyboard navigation and readable labels
- Global and component-level error handling

---

---

## Folder structure

Below is a compact overview of the repo layout (high level):

```
src/
├─ assets/            # images, logos, backgrounds
├─ components/        # UI: Chat, Sidebar, Auth, Profile, Media, Common
├─ config/            # firebase, cloudinary, socket setup
├─ context/           # AuthContext, ChatContext, ThemeContext
├─ hooks/             # reusable hooks (useAuth, useChat...)
├─ pages/             # top-level pages (Home, Chat, Profile, Auth)
├─ styles/            # global styles + tailwind config
├─ utils/             # helpers (firebase wrapper, cloudinary, time utils)
├─ App.jsx
└─ main.jsx

.env.example
vite.config.js
package.json
```

For a more detailed tree, see the `src/` folder in the project.

---

## Getting started (local)

Follow these steps to run the app locally (PowerShell friendly):

1. Clone & install

```powershell
git clone https://github.com/abdulkalamazad1001/nexora-chat-app.git
cd nexora-chat-app
npm install
```

2. Environment variables

Copy the example env and fill in your Firebase + Cloudinary credentials:

```powershell
Copy-Item .env.example .env
# Then open .env and populate values (FIREBASE_API_KEY, CLOUDINARY_* etc.)
```

3. Run dev server

```powershell
npm run dev
```

Open http://localhost:5173 in your browser.

---

## Deployment

This project is configured for zero-downtime deployments with Vercel. Basic steps:

1. Push your branch to GitHub.
2. In Vercel, import the repository and set environment variables from `.env.example` values in the Vercel dashboard.
3. Vercel will build and deploy automatically on push.

Tips:

- Keep secrets in the Vercel dashboard only.
- Use preview deployments for testing before merging to `main`.

---

## Roadmap

- Message reactions (emoji/stickers)
- Push notifications (browser & mobile)
- Full group DMs & roles
- i18n and multi-language support
- Voice notes, GIFs, and richer media types
- Admin moderation console

---

## Contributing & Contact

Made by T. Abdul Kalam Azad

If you want to contribute:

1. Fork the repo
2. Create a feature branch
3. Open a PR with a clear description and screenshots

Contact / author: `abdulkalamazad1001` on GitHub

---

## Notes & next steps

- Add your screenshot files to `public/screenshots/` and the images will appear in the screenshots section.
- Consider adding a small `CONTRIBUTING.md` and a `LICENSE` for clarity.

Thank you for building Nexora — it's a beautiful base for secure, real-time chat.
