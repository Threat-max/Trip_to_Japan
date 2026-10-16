# Trip to Japan

A multi-page travel agency website about tours in Japan. The project was created at Astana IT University (School of Software Engineering, group SE-2512) as part of the Frontend course.

**Live website:** [Insert GitHub Pages / Netlify URL]

## Team

- Maqsat Nauanuly: Project Manager & Designer
- Tolendi Arsen: Developer & Content Creator

## Pages

| Page | Description |
|---|---|
| `index.html` | Home page with a hero banner, "Why Travel With Us" cards, and featured tour packages |
| `tours.html` | Tours and pricing table, what is included in the price |
| `gallery.html` | Image carousel and a photo grid with hover captions |
| `about.html` | Mission, team cards, and FAQ |
| `contact.html` | Tour booking form |

## Technologies

- HTML5
- CSS3 (Grid, Flexbox, media queries)
- Bootstrap 5.3.3 (navbar, grid, cards, carousel, forms, button groups)
- JavaScript (vanilla, no libraries)

## JavaScript Features (Assignment 4)

All JavaScript code is in one file, `js/script.js`, which is linked at the bottom of every HTML page. Each feature checks that its elements exist on the page before running, so the same file is safe to use everywhere.

| # | Feature | Page | How it works |
|---|---|---|---|
| 1 | Form validation | `contact.html` | Checks full name, email format, tour selection, phone (10 digits, optional), password (at least 8 characters), and password confirmation. Shows an error message under each wrong field. |
| 2 | FAQ accordion | `about.html` | Answers are hidden by default. Click on a question to show the answer with a smooth transition, click again to hide it. |
| 3 | Popup subscription form | `index.html` | The Subscribe button opens a popup form. It closes with the × button, a click outside the box, or the Esc key. |
| 4 | Background color changer | `gallery.html` | Each click on the button switches the page background to the next color from a list of five. |
| 5 | Current date and time | `index.html` | Shows the date and time from the `Date` object, updated every second (example: October 16, 2026, 10:45:30 AM). |

## Project Structure

```
trip-to-japan/
├── index.html
├── tours.html
├── gallery.html
├── about.html
├── contact.html
├── css/
│   └── style.css
├── js/
│   └── script.js
└── README.md
```

## How to Run

1. Download or clone the repository.
2. Open `index.html` in any modern browser.

No installation or build step is needed. An internet connection is required to load Bootstrap, Google Fonts, and the images.

## Deployment

The site is deployed with [GitHub Pages / Netlify]. After every `git push` to the main branch the site is rebuilt automatically.

## Design

- Colors: navy `#122238` and red `#d92736` with a light background `#f4f6f9`
- Fonts: Playfair Display for headings, Inter for text
- Responsive layout for mobile, tablet, and desktop

© 2026 Trip to Japan | Team: Maqsat Nauanuly & Tolendi Arsen
