# Bijay Subedi — Portfolio

Source for [bijay3030.github.io](https://bijay3030.github.io): the portfolio of Bijay Subedi, a senior software engineer (Ruby on Rails, React, AWS) in Kathmandu, Nepal.

Built with Gatsby 5, React 18, and styled-components. Originally based on [Brittany Chiang](https://brittanychiang.com)'s open-source [v4 site](https://github.com/bchiang7/v4) (MIT); see `LICENSE`.

## What's on the site

- **Home (`/`)**: hero with availability, about, experience, featured projects, testimonials (when published), quick answers (FAQ), contact.
- **Case studies (`/projects/<slug>/`)**: one page per project with an architecture diagram, contribution, problem, decisions, and results.
- **Writing (`/writing/`)**: blog posts, with an RSS feed at `/rss.xml`.
- **SEO / AI answer engines**: per-page titles, descriptions, canonical URLs, Open Graph images, JSON-LD (Person, WebSite, ProfilePage, Article, BreadcrumbList, FAQPage), sitemap, a root `robots.txt` that welcomes AI search crawlers, and `/llms.txt`.

## Run locally

Requires Node 22 (see `.nvmrc`).

```bash
nvm use
npm install
npm start          # dev server at http://localhost:8000
npm run build      # production build into public/
npm run serve      # serve the production build at http://localhost:9000
npm run preview    # build + serve in one step
```

`npm start` is the development server: the first visit to each page type compiles it on demand, so it can take a few seconds. To judge real page speed, use `npm run preview`.

## Editing content

| What                    | Where                                                                                                    |
| ----------------------- | -------------------------------------------------------------------------------------------------------- |
| Hero, availability line | `src/components/sections/hero.js`, `availability` in `src/config.js`                                     |
| About text and skills   | `src/components/sections/about.js`                                                                       |
| Experience              | `content/jobs/*/index.md` (`stack` and `tabLabel` fields add pills and tab names)                        |
| Projects / case studies | `content/featured/<Project>/index.md` — frontmatter drives the homepage card, the body is the case study |
| Testimonials            | copy `content/testimonials/example/`, fill it in, set `draft: false`                                     |
| Blog posts              | `content/posts/<slug>/index.md`, set `draft: false` to publish                                           |
| FAQ                     | `src/components/sections/faq.js`                                                                         |
| AI-crawler summary      | `static/llms.txt`                                                                                        |
| Resume                  | `static/resume.pdf`                                                                                      |

Lines marked `<!-- REVIEW ... -->` in case studies and drafts are notes to check before publishing; they don't render.

### Diagrams and share images

Architecture diagrams (`content/featured/*/architecture.{svg,png}`) and Open Graph images (`static/og/*.png`) are generated:

```bash
brew install librsvg        # once
python3 scripts/generate-images.py
```

Edit the node and label lists in `scripts/generate-images.py` to change them.

## Deploy (GitHub Pages)

The site is served from the root of the `bijay3030.github.io` user site.

```bash
npm run deploy     # builds and pushes public/ to the gh-pages branch
npm run ping       # optional: tell Bing/IndexNow engines that pages changed
```

One-time GitHub setting: **Settings → Pages → Deploy from a branch → `gh-pages` / root**.

## Measurement

Nothing is tracked unless these environment variables are set when you build:

| Variable                          | Used for                                                     |
| --------------------------------- | ------------------------------------------------------------ |
| `GATSBY_GOOGLE_SITE_VERIFICATION` | Google Search Console HTML-tag verification                  |
| `GATSBY_BING_SITE_VERIFICATION`   | Bing Webmaster Tools verification (`msvalidate.01`)          |
| `GATSBY_GA_MEASUREMENT_ID`        | Google Analytics 4 (e.g. `G-XXXXXXX`); respects Do Not Track |

Example:

```bash
GATSBY_GOOGLE_SITE_VERIFICATION=abc123 GATSBY_BING_SITE_VERIFICATION=def456 npm run deploy
```
