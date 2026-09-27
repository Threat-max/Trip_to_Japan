# Trip to Japan 🗻

A responsive travel-agency website built for **Astana IT University — Front-End Development (Group SE-2512)**.

Assignment #3: *Media Queries + Bootstrap Grid*

**Team:**
- Maqsat Nauanuly — Project Manager & Designer
- Tolendi Arsen — Developer & Content Creator

**Live demo:** _[add your GitHub Pages / Netlify URL here after deployment]_

---

## About

Trip to Japan is a 5-page travel booking site (Home, Tours, Gallery, About Us, Contact) styled with a navy-and-red brand identity (`#122238` / `#D92736`, Playfair Display + Inter fonts). The layout uses CSS Grid for the page shell (header / sidebar / main / footer) and Bootstrap 5 for components, combined with hand-written CSS media queries for full responsiveness across mobile, tablet, and desktop.

## Pages

| File | Description |
|---|---|
| `index.html` | Home — hero banner, "Why Travel With Us" card row, featured tour packages |
| `tours.html` | Tours & pricing table, "What's Included" / "Why Book With Us" |
| `gallery.html` | Image carousel + hover-caption photo grid |
| `about.html` | Mission statement + team profiles |
| `contact.html` | Booking form |

## Tech Stack

- HTML5 / CSS3
- [Bootstrap 5.3](https://getbootstrap.com/) (via CDN — grid, navbar, buttons, cards, carousel, forms)
- Custom CSS (`css/style.css`) — layout, theming, and pure media-query responsiveness
- Google Fonts — Playfair Display, Inter

No build step or package manager is required — everything runs as static files.

## Folder Structure

```
.
├── index.html
├── tours.html
├── gallery.html
├── about.html
├── contact.html
├── css/
│   └── style.css
└── img/            (place local images here if you replace the Unsplash placeholders)
```

## Features by Task (Assignment #3)

1. **Responsive Typography** — `h1/h2/h3/p` font sizes scale at 576px (tablet) and 992px (desktop) breakpoints via pure CSS media queries.
2. **Card Group (pure CSS)** — the "Why Travel With Us" row on Home stacks on mobile, shows 2 per row on tablet, 3 per row on desktop — no Bootstrap classes used, per the assignment's requirement.
3. **Bootstrap Grid** — a 2-column (`col-lg-6`) section on About Us & Tours, and a 3-column (`col-lg-4`) section on Home, each wrapped in `container-fluid`.
4. **Bootstrap Spacing Utilities** — `p-*`, `m-*`, and `g-*` utility classes replace hardcoded CSS padding/margins, with responsive variants (`p-lg-5`, `mt-lg-0`, etc.).
5. **Bootstrap Navbar** — themed navy navbar with a collapsing hamburger menu on all 5 pages.
6. **Bootstrap Buttons** — `btn-primary` / `btn-outline-primary` / `btn-lg` / `btn-sm`, plus a vertical button group (Tours filters) and a horizontal button group (Contact form actions).
7. **Bootstrap Carousel** — 9-image carousel on the Gallery page with indicators and prev/next controls.
8. **Bootstrap Cards** — featured packages (Home) and team profiles (`card-group` on About Us).
9. **Responsive Form** — the Contact form uses `form-control`, `form-select`, `form-check`, and `input-group`, laid out in a responsive two-column grid.
10. **Accessibility** — semantic `<nav>/<main>/<aside>/<footer>/<button>` elements, `aria-label`/`aria-expanded` on interactive controls, descriptive `alt` text on all images, and brand colors checked for readable contrast.

## Running Locally

No server required — just open any `.html` file in a browser, or serve the folder for correct relative paths:

```bash
# Python
python3 -m http.server 8000

# Node
npx serve .
```

Then visit `http://localhost:8000`.

## Deployment

1. Push this folder to your team's GitHub repository.
2. Enable **GitHub Pages** (Settings → Pages → deploy from `main` branch), or deploy the folder to **Netlify**.
3. Copy the live URL into the top of this README and into the assignment report.

## Notes

- The team photos on the About Us page are placeholders — replace the `<img src="...">` URLs with your own photos before final submission.
- All external assets (Bootstrap, Google Fonts, Unsplash images) are loaded via CDN, so an internet connection is required to view the site fully styled.
