# Backend notes (not built)

Safe Ride Home’s preview site is static. Nothing in this repository accepts rides, donations, uploads, or waitlist entries. There is no database, no serverless deployment, and no secret store.

These notes are a stub for a later version, after the nonprofit exists and someone decides to collect data at all.

## Intended shape

- **Runtime:** a serverless function host such as Cloudflare Workers, or something similar. TODO: choose a host. Do not deploy the stub in `workers/` as-is.
- **Database:** a free-tier database. TODO: choose one. Cloudflare D1 is a candidate only because it sits next to Workers. It is not selected.
- **Object storage:** encrypted storage for a parish or church card image, separate from the database. See [faith-card-verification.md](faith-card-verification.md).
- **Secrets:** provider tokens, storage credentials, and signing keys live in the host’s secret store. They do not belong in this git repo or in the static site.

## Routes to add later

None of these exist today. Names are placeholders.

| Method | Path | Purpose |
| --- | --- | --- |
| `POST` | `/api/ride-requests` | Store a ride request and match it to available donor funds. |
| `POST` | `/api/donations` | Start a donation only after the nonprofit can legally accept money. |
| `POST` | `/api/faith-card` | Accept a card image for verification. Details in the faith-card doc. |
| `POST` | `/api/crew-waitlist` | Store a Sober Driver Crew waitlist entry. |
| `GET` | `/api/totals` | Return real donations raised and rides funded. Until then the site shows `0` and “Launching soon”. |

Matching a rider to a credit has to produce a plain-language reason, for example: “Funds available covered 100% of this ride.” If the fund covers part of the credit, the reason names the share and what is left to pay. If it covers nothing, the reason says so. TODO: the price of a ride credit or voucher comes from the real program. Do not invent that price in the API.

## Sober Driver Crew flag

`js/flags.js` sets `SOBER_CREW_DISPATCH_ENABLED` to `false`.

That flag may only be turned on after Mann confirms in writing that insurance (including coverage for driving a third party’s vehicle), background checks, and applicable Rhode Island rules are in place. A later dispatch route must read the same flag and refuse to run while it is false.

## Free-tier database sketch

`docs/schema.sql` is a commented sketch. It has not been applied anywhere.

Keep parish card images out of the database. The long-term faith row is only:

```text
{ verified: bool, parish_name, verified_at }
```

## What the static site must keep doing

- Relative URLs, so GitHub Pages works at `/safe-ride-home/`.
- No analytics, pixels, or third-party scripts.
- No form posts. The content security policy uses `form-action 'none'`.
- Sample numbers stay labeled `SAMPLE DATA`. Live totals stay at zero until `/api/totals` is real.
