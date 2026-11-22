# Safe Ride Home

Safe Ride Home is a planned Rhode Island nonprofit so nobody drives drunk. The pilot starts in Rhode Island. Founder: Mann Novi, Coventry, RI.

Version 1 has no in-house drivers. A rider would request a safe ride, and donor funds would cover it with a ride credit or voucher — free or discounted, depending on the funds on hand. TODO: the ride-credit program and its terms are not chosen. This site does not state a company’s prices or a partnership.

The nonprofit is **not formed yet**. This repository is a **demo / preview website**.

- No live payments
- No real ride dispatch
- No real data collection
- No analytics or tracking scripts
- Live counters show `$0` and `0` rides, with “Launching soon”
- Any other number is labeled **SAMPLE DATA**

Every page carries this banner:

> Preview: Safe Ride Home is getting ready to launch in Rhode Island. No real rides or donations yet.

## Run it locally

From the repository root:

```bash
python3 -m http.server 8080
```

Open `http://localhost:8080/`. Use a phone-width window (about 390px) and a desktop window (about 1280px). Paths are relative, so the same files work in a subfolder.

## GitHub Pages

The site is plain HTML, CSS, and JavaScript at the repository root, plus a `.nojekyll` file so GitHub Pages will not run Jekyll.

After this is on `main`:

1. Open the repository **Settings**.
2. Open **Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Branch: **main**. Folder: **/ (root)**.
5. Save.

The site is intended to be served at:

`https://manovi-code.github.io/safe-ride-home/`

Hosting cost is about $0 per month. Pages serves the committed files. There is no build step.

## What’s in the preview

| Page | What it shows |
| --- | --- |
| `index.html` | Landing page and the three calls to action |
| `request.html` | Ride request demo. Ends by saying nothing was sent, with a sample “why you got this” sentence. A package can be preselected. |
| `sponsor.html` | Sponsor demo. No payment. Donations open after the nonprofit exists. Includes “Gift a New Driver Safe Pass”. |
| `packages.html` | Ride packages (Romantic Getaway, Squad Ride, New Driver Safe Pass). Pricing TBD. No payments. |
| `stats.html` | Live zeros, plus sample rides, miles, an estimated-DUI formula, and a sample leaderboard |
| `faith.html` | Parish / church card preview. The image stays in the browser |
| `crew.html` | Sober Driver Crew waitlist demo. Dispatch is off |
| `about.html` | How it works, and FAQ |
| `privacy.html` | Data-minimization summary |
| `profile-*.html` | Sample rider, donor, and volunteer. Not real people |

`js/flags.js` sets `SOBER_CREW_DISPATCH_ENABLED = false`. That flag may only be turned on after Mann confirms in writing that insurance (including driving a third party’s vehicle), background checks, and Rhode Island rules are in place.

## Later backend (not wired)

`docs/backend.md` sketches serverless functions (Cloudflare Workers or similar) and a free-tier database. `docs/faith-card-verification.md` describes encrypted object storage, a verification step, deletion within 24 hours, and a database row limited to `{ verified, parish_name, verified_at }`. `workers/faith-card.stub.js` throws if called. The website does not load it. `docs/schema.sql` is comments only and is not applied.
