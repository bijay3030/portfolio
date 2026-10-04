# bijay-site

Personal site for Bijay Subedi. One page, built with Astro, and designed so every element has a reason to be there.

## The idea

- **Short to scan, with more for anyone who wants it.** Each section shows a one-line teaser before you open it. Each project gives a sentence plus a *before → after* line, and opens into the full case study: workflow, problem, decisions, results.
- **Show it, don't just say it.** The live Kathmandu clock shows your time next to the visitor's, so overlap is visible. "How I work" principles each point to the project where they were learned.
- **No tricks.** No tracking, no scroll-jacking, no framework JavaScript. The only scripts are the clock, copy-email, and opening a section when its #link is followed.

## Editing content

| What | Where |
| --- | --- |
| Name, statement, links, availability | `src/data/site.ts` → `profile` |
| About text and numbers | `src/data/site.ts` → `about`, `numbers` |
| Case studies | `src/data/site.ts` → `projects` |
| Experience, open source, principles, toolkit | `src/data/site.ts` |
| Blog posts | `src/content/writing/*.md` (set `draft: false` to publish) |
| Testimonials | `src/data/site.ts` → `testimonials` (entries with `sample: true` show only in `npm run dev`) |
| Architecture diagrams | `architecture` on each project in `src/data/site.ts` |
| Portrait | `src/assets/portrait.jpg` |
| Résumé | `public/resume.pdf` |

Draft posts appear on the home page as "Draft" with no link. In `npm run dev` you can still preview them at `/writing/<file-name>/`, but production builds skip them.

## Commands

```bash
npm install
```

```bash
npm run dev
```

```bash
npm run build
```

## Deploying to GitHub Pages

This repo is the GitHub Pages user site, served at https://bijay3030.github.io. `.github/workflows/deploy.yml` builds and deploys on every push to `main`, and the repository's Pages source is set to **GitHub Actions**.

- `astro.config.mjs` sets `site` and redirects the old Gatsby URLs (`/about`, `/resume`, `/projects/*`, `/writing`) to where that content lives now.
- Internal links go through `url()` in `src/utils/url.ts`, so changing `base` later only means editing the config.
- The previous Gatsby build is still on the `gh-pages` branch as a rollback. It isn't served.

## Design notes

- Type: Newsreader (variable serif with optical sizes) for reading; Geist Mono for labels and metadata.
- Color: warm paper `#f4f0e6`, ink `#1d1b16`, and one accent, sindoor red `#b23a24`. The accent only appears where something changes or ends: the end of a workflow, a result, the live dot.
- Layout: a 38rem reading column. On wide screens, section numbers (§ 01) sit in the left margin, like notes on a manuscript.
- Motion: one staggered fade-in when the page loads, and smooth open/close on sections. Both turn off when the visitor has reduced motion enabled.
