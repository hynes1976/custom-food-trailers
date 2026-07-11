# Deploying Custom Food Trailers to GitHub + Cloudflare Pages

Free hosting, no build step. You push these files to a GitHub repo, connect it to
Cloudflare Pages, and it goes live in about a minute. Total time: ~20 minutes.

The files to deploy are everything in this folder (index.html, the other pages,
`assets/`, `functions/`, `_headers`, `_redirects`, `robots.txt`, `sitemap.xml`).

---

## Step 1 — Put the site on GitHub (5 min)
You don't need to install anything; you can upload in the browser.

1. Sign in at github.com and click **New repository**.
2. Name it e.g. `custom-food-trailers`, set it **Private**, click **Create**.
3. On the empty repo page click **uploading an existing file**.
4. Drag in the **contents** of this folder (not the folder itself — the files
   should sit at the repo root, so `index.html` is at the top level).
5. Scroll down, click **Commit changes**.

## Step 2 — Connect Cloudflare Pages (5 min)
1. Sign in at dash.cloudflare.com (free account).
2. **Workers & Pages → Create → Pages → Connect to Git**, authorise GitHub and
   pick the `custom-food-trailers` repo.
3. Build settings:
   - Framework preset: **None**
   - Build command: **leave empty**
   - Build output directory: **/** (root — where `index.html` is)
4. Click **Save and Deploy**. After ~1 minute you get a live URL like
   `custom-food-trailers.pages.dev`. Open it and click through every page.

That URL is your shareable preview link — send it to anyone for review before
touching the real domain.

## Step 3 — Turn on the enquiry emails (5 min)
The Contact form, the builder "Get My Quote" and the finance form all post to the
`functions/api/enquiry.js` Function. To make them email you:

1. Create a free account at **resend.com** using your business inbox
   (`andrew@customfoodtrailers.co.uk`).
2. In Cloudflare → your Pages project → **Settings → Variables and secrets**, add:
   - `RESEND_API_KEY` — from Resend (add as a **Secret**).
   - `FROM_EMAIL` — `onboarding@resend.dev` for now (until you verify a domain).
   - `BOOKINGS_EMAIL` — `andrew@customfoodtrailers.co.uk`.
3. **Redeploy** (Deployments → Retry, or push any commit) — variable changes only
   take effect on the next build.
4. Send yourself a test enquiry from the live site.

Note: with no domain verified in Resend, it can only send to the account's own
signup email — which is why you sign Resend up with your business inbox. Verify
your domain in Resend later to send from `website@customfoodtrailers.co.uk`.

## Step 4 — Point the domain (GoDaddy DNS, website only — do last)
Your domain is registered at **GoDaddy** and email is on **Microsoft 365**. We are
leaving DNS at GoDaddy and only pointing the website, so **email is untouched**.
`www` is the primary web address; the bare domain forwards to it.

1. In Cloudflare → **Pages → your project → Custom domains → Set up a domain**,
   add **`www.customfoodtrailers.co.uk`**. Cloudflare will show a **CNAME target**
   like `custom-food-trailers.pages.dev`.
2. In **GoDaddy → Domain → DNS → Records**, add/edit the `www` record:
   ```
   Type: CNAME   Name: www   Value: custom-food-trailers.pages.dev   TTL: 1 hour
   ```
   (If a `www` record already points to Webflow, edit it to this value — that's
   the moment the live site switches to the new one.)
3. For the bare domain `customfoodtrailers.co.uk`, GoDaddy can't CNAME the apex,
   so use **GoDaddy → Domain → Forwarding**: forward
   `customfoodtrailers.co.uk` → `https://www.customfoodtrailers.co.uk`
   (permanent 301, forward only).
4. Back in Cloudflare Custom domains, confirm `www` shows **Active** (SSL issues
   automatically once the CNAME resolves — a few minutes).
5. **Do NOT touch the MX, SPF, DKIM or `autodiscover` records** — those are your
   Microsoft 365 email and stay as they are (until the separate Zoho migration).
6. Don't cancel the old Webflow site until the new `www` resolves and every page
   plus the enquiry form works.

Tip: check progress any time with
`https://dns.google/resolve?name=www.customfoodtrailers.co.uk&type=CNAME`.

---

## Important before full go-live: the images
To match your current site quickly, the product cards and gallery currently load
images from your existing Webflow CDN (`cdn.prod.website-files.com/...`). They
display fine now, but if you ever close the Webflow account those images would
break. Before you retire Webflow, either:
- send me your preferred UK/EU photos and I'll bundle them into `assets/img/` and
  repoint the pages (recommended), or
- download the current Webflow images into `assets/img/` and update the URLs.

The site's own images (logo, hero, footer logo) are already local in `assets/img/`.

## Editing later
Change a file, then in GitHub use **Add file → Upload files** (or edit in place)
and commit to `main`. Cloudflare rebuilds automatically in ~1 minute.
