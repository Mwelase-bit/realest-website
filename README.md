# Realest Auto Collective — Website

A cinematic, multi-page website for Realest Auto Collective (Katlehong, ZA).
The home page opens with one continuous camera move: a top-down view of a
laptop, a slow approach, then a dive straight into the screen that resolves —
without a cut — into the brand film playing fullscreen behind the Realest hero.

## Stack
- React 18 + Vite + TypeScript
- Tailwind CSS 3 (`primary: #DEDBC8`)
- Framer Motion (scroll-driven camera, pull-up text, reveals)
- lucide-react
- react-router-dom (HashRouter for static hosting; swap to BrowserRouter behind SPA rewrites)
- Fonts: Almarai (global) + Instrument Serif italic (accents)

## Run
```bash
npm install
npm run dev      # local dev server
npm run build    # production build to /dist
```

## Structure
```
src/
  components/
    ui.tsx             # Navbar, Footer, WordsPullUp, PillButton, Reveal, icons
    CinematicHero.tsx  # the continuous laptop → film camera sequence
  pages/
    Home.tsx           # hero + mission, services, stats, milestones, CTA
    index.tsx          # Services, Story, Contact (+ validated inquiry form)
  lib/
    content.ts         # all copy/data from the business plan (single source of truth)
    api.ts             # inquiry validation + API-ready submit (VITE_API_URL)
public/
  golf-burgundy-reveal-v2.mp4   # the hero film
```

## Backend
The inquiry form is API-ready: set `VITE_API_URL` in `.env` and it POSTs
JSON to `{VITE_API_URL}/inquiries`. Without it, submissions resolve locally
so the whole UX (validation, loading, success, error states) still works.

Accessibility: respects `prefers-reduced-motion` (static hero fallback),
keyboard-focusable controls, semantic landmarks.
