# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A static one-page landing site (`index.html` + `styles.css` + `script.js`, no build step, no dependencies) archiving builds from a private Minecraft server for a group of friends. Content and copy are in Russian.

## Running

No build/install step. Open `index.html` directly in a browser, or serve it so it's reachable from other devices (e.g. a phone on the same LAN):

```
python -m http.server 8080 --bind 0.0.0.0
```

Then visit `http://<machine-LAN-IP>:8080`. There is no dev server, linter, or test suite in this project.

## Structure

- `index.html` — entire page markup: hero, "symbol" section (server mascot statue), and a single sequential list (`.house-grid`) of full-viewport-height `.house-card` articles, one per participant, followed by `footer`, then a shared lightbox modal markup at the bottom.
- `styles.css` — all styling, CSS custom properties defined in `:root` (colors, fonts). No preprocessor, no CSS modules.
- `script.js` — vanilla JS, IIFE, no framework. Wires up the lightbox (open/close/prev/next/thumbnail-click/keyboard) by reading `data-images` (comma-separated paths) and `data-alts` (`|`-separated captions) attributes off each `.house-card` and off `.symbol__frame`.
- `assets/images/` — web-sized JPEGs (~1600px main / ~800px thumb, quality ~85) generated from the original in-game screenshots. The originals (per-player folders at the repo root, named after Minecraft usernames, plus the root-level `huge_*.png` files) are raw "huge screenshot" panorama captures — commonly 15000px+ wide, tens to hundreds of MB — and are never referenced directly from the page. When adding a new photo, downscale it into `assets/images/` first.
- `.claude/skills/frontend-design/` — a project skill enforcing a specific visual-design process (bold aesthetic direction, no generic AI-slop styling/fonts/colors). Load this skill before making any visual/layout changes to keep the site consistent with its established dark "night-world" aesthetic.
- `www.minecraft.net_ru-ru.png` — the visual style reference this design was built against; not part of the served site.

## Card conventions (`.house-card`)

Each participant is one `<article class="house-card">` in `#houses .house-grid`, in this shape:

- `data-images` / `data-alts` on the `<article>` list every photo for that person (main photo first).
- `.house-card__shot--main` is the big photo; `.house-card__shot--thumb` entries below it are small preview shots. Every shot button has `data-index` matching its position in `data-images`, and click opens the shared lightbox at that index — see the `.house-card__shot` wiring in `script.js`.
- `--tag-color` (inline `style` on the `<article>`) drives that card's accent color (nick label, left border, etc.) via CSS variable fallback (`var(--tag-color, var(--gold))`).
- The small `<p class="house-card__nick">` holds the person's real name and the big `<h3 class="house-card__name">` holds their Minecraft nickname — nickname is the visually emphasized one, by design (not a bug if it looks swapped).
- Participants without photos use `.house-card.house-card--noimg.house-card--compact`: no `data-images`/lightbox wiring, an SVG icon in place of a photo, and shorter (non-100vh) height so they don't compete visually with the photo cards. Keep new no-photo entries in this same flat list — don't reintroduce a separate "special participants" section/heading, that was explicitly removed.

## Working with the source screenshots

The per-player folders and root `huge_*.png` files are original, very large Minecraft screenshots (panoramic "huge screenshot" captures). Do not read or process them directly at full size — resize/compress into `assets/images/` first (PowerShell + `System.Drawing`, or any image tool) before referencing them from HTML, and before viewing them yourself.
