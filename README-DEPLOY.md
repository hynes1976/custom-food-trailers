# Custom Food Trailers UK — new site

A fast, static rebuild (vanilla HTML, CSS and JS) using the same free hosting
approach as the Wake District site: Cloudflare Pages deployed from GitHub. No
build step, no npm.

## Pages
- `index.html` — Home
- `our-trailers.html` — Full range, standard spec, power solutions, gallery
- `build-your-own.html` — Interactive builder with a live price estimate
- `about.html` — About / the team
- `buying-guide.html` — SEO article + FAQ (replaces /guides/how-to-choose-a-trailer)
- `contact.html` — Enquiry form + details
- `privacy.html`, `terms.html`, `404.html`

Shared header and footer are injected by `assets/js/main.js`, so navigation stays
in sync across every page. Brand theme lives in `assets/css/styles.css`.

## Images — action needed before final go-live
To ship fast, the pages currently reference the existing photos on your live
Webflow CDN (`cdn.prod.website-files.com/...`). That means they display today with
zero extra work. Before you fully cut over you should **localise** them so the new
site does not depend on the old host:

1. Download each image the pages reference.
2. Save them into `assets/img/`.
3. Find-and-replace the `https://cdn.prod.website-files.com/690239bf.../` URLs with
   `assets/img/<filename>`.

Slots marked "Drop new Airstream shoot photo here" (`.photo-slot`) are where new
photography should go — the gallery grid on `our-trailers.html` and the homepage
gallery are the priority spots for fresh Airstream shots.

## Deploy (mirrors the Wake District workflow)
1. Create a GitHub repo (e.g. `hynes1976/custom-food-trailers`) and push this
   folder's contents to `main`.
2. In Cloudflare → Pages → Create project → connect the repo.
   - Build command: **none**
   - Build output directory: **/** (root — this folder)
3. Cloudflare builds in ~1 minute and gives you a `*.pages.dev` URL to preview.
4. Add the custom domain `www.customfoodtrailers.co.uk` in Pages → Custom domains,
   then point the domain's DNS to Cloudflare (only after you're happy with preview).

## Contact & builder forms — two ready paths
Both the contact form and the builder ("send my build to the team") are wired up.
The builder also attaches the live price estimate and chosen specification to the
enquiry. Pick ONE delivery path in `assets/js/main.js` (top of the form section):

**A) Formspree — fastest, no server (recommended to start)**
1. Sign up at formspree.io, create a form, copy its endpoint
   (looks like `https://formspree.io/f/abcwxyz`).
2. In `assets/js/main.js`, set `FORMSPREE_ENDPOINT` to that URL.
3. Done — submissions email you. Free tier ~50/month.

**B) Cloudflare Function + Resend — fully branded, matches Wake District**
1. In `assets/js/main.js`, set `USE_FUNCTION: true`.
2. The function is already built at `functions/api/enquiry.js`.
3. In Cloudflare → Pages → Settings → Variables add `RESEND_API_KEY`,
   `FROM_EMAIL` and `BOOKINGS_EMAIL`, then redeploy.

Until you configure one, the forms still show a thank-you so the page never looks
broken. A hidden honeypot field is included on both forms to cut spam.

## Weekly reel reminder
A scheduled task has been set to remind you every Monday at 8am to film and post
that week's Instagram reel, cycling through the four in the plan. You can change or
cancel it any time from your scheduled tasks.

## SEO built in
- Unique title + meta description per page, canonical tags, Open Graph + Twitter cards
- JSON-LD structured data: LocalBusiness, Product/AggregateOffer, Article, FAQPage, BreadcrumbList
- `sitemap.xml`, `robots.txt`, clean URLs via `_redirects`, 301 from the old guide URL
- Semantic headings, descriptive alt text, lazy-loaded images, system fonts fallback
