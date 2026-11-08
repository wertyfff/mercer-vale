# MERCER VALE

An editorial fashion website with separate Women / Men collections, responsive photography and restrained motion.

Live site: https://wertyfff.github.io/mercer-vale/

## Local preview

Run `python -m http.server 4173 --bind 127.0.0.1` in this directory and open http://127.0.0.1:4173.

Plain HTML, CSS and JavaScript; no build step or package dependencies. Photography is local. DM Sans and Instrument Serif load from Google Fonts, with system fallbacks.

## Interface

- Women: Outerwear, Shirts & tops, Knitwear. Men: Outerwear, Shirts & tops, Tailoring.
- Eight distinct photographs in each collection: 48 in total, without repeats between collections.
- Local search, collection-scoped lookbook, arrow keys, touch swipes and Escape.
- Three editorial styling stories and a smoothly animated FAQ.
- A minimal, skippable loading wordmark and progress bar, with a reduced-motion alternative.
- Mobile layouts with readable copy, 44px controls, safe-area spacing, portrait and landscape handling.
- Responsive WebP photographs, with original JPEG assets retained.

This is a concept and enquiry site. The photographs are visual references; orders and checkout are not configured.

## Content

`контент/скриншоты/01.png` through `07.png` are seven separate landscape captures, 1920 × 1080 each, with no added captions.

`контент/проект-en.html` and the corresponding JPG, PNG and PDF contain the English Behance presentation. The Russian version and the original preview are also retained.

## Hosting

GitHub Pages serves the main branch from the repository root. `.nojekyll` preserves the static files. All application URLs are relative so the site works under `/mercer-vale/`.

Photography credits: `assets/SOURCES.md`. Research and design notes: `RESEARCH.md`, `COPY-REVIEW.md`, `PRODUCT.md`, `DESIGN.md`.
