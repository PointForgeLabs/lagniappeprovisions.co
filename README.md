# lagniappeprovisions.co

Marketing website for **Lagniappe Provisions** — a small-batch cocktail syrup,
bitters, and dehydrated fruit company based in New Orleans, majority woman-owned,
founded by a 20-year bar professional. Static, dependency-free site (plain
HTML/CSS, no build step) designed to be served by GitHub Pages at
https://lagniappeprovisions.co.

## Contents

| File | Purpose |
|---|---|
| `index.html` | Home: hero, product blocks (syrups/bitters/dried fruit), lagniappe definition, story + audiences, email signup |
| `products/spiced-cane-syrup.html` | Product detail page (media column, specs, qty stepper, add-to-cart, related products) |
| `styles.css` | All styling ("Second Line" design system — Archivo + IBM Plex Mono, ink/cream/gold/purple/green, flat blocks, 3px rules, zero radius) |
| `site.js` | Shared behavior: mobile nav, offset smooth-scroll, signup swap, qty stepper + add-to-cart |
| `404.html` | Custom not-found page (GitHub Pages picks this up automatically) |
| `favicon.svg` | Asterisk-coin logo mark |
| `CNAME` | Custom-domain binding for GitHub Pages |
| `robots.txt`, `sitemap.xml` | Basic SEO plumbing |

## Design system ("Second Line")

Bold editorial: oversized uppercase Archivo display, IBM Plex Mono micro-labels,
flat Mardi Gras-adjacent color blocks, signature **3px solid ink rules**, no
rounded corners, no shadows. Tokens live in `:root` at the top of `styles.css`
(`--ink #1c1710`, `--cream #f5efe2`, `--gold #dfa23c`, `--purple #8a2d5e`,
`--green #2e6b4f`). Dashed/striped boxes are placeholders for product
photography that doesn't exist yet — swap them for real `<img>` shots when
available.

## Deploying with GitHub Pages

1. In the new repo: **Settings → Pages → Source: Deploy from a branch**, branch
   `main`, folder `/ (root)`.
2. Under **Custom domain**, enter `lagniappeprovisions.co` (the `CNAME` file in
   this repo keeps it pinned). Enable **Enforce HTTPS** once the cert issues.
3. At your DNS provider, point the domain at GitHub Pages:
   - Four `A` records on the apex (`@`): `185.199.108.153`, `185.199.109.153`,
     `185.199.110.153`, `185.199.111.153`
   - Optional `www` `CNAME` record → `pointforgelabs.github.io`

## Things to customize

- **Signup form**: set `FORM_ENDPOINT` in `index.html` to a Formspree/Buttondown
  endpoint. Until then, the form falls back to opening a pre-filled email to
  `hello@lagniappeprovisions.co`.
- **Contact email**: `hello@lagniappeprovisions.co` appears in `index.html`
  (config block, footer, JSON-LD) — update if you use a different address.
- **Copy**: product cards (syrups, bitters, dehydrated fruit) and the founder
  story reflect the real business — refine specifics (flavors, SKUs, founder
  name/bio) as they're finalized.
- **Analytics**: no tracker is installed; add a GA4 snippet in `<head>` if wanted.
- **OG image**: no `og:image` is set yet — add a 1200×630 image and the meta
  tags when brand art exists.
