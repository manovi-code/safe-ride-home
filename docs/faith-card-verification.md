# Faith-card verification (design only)

This is the intended backend for the faith-community discount. It is **not implemented**. The preview page never uploads an image.

Catholic parish cards and cards from other faiths are in scope. The discount amount is not set. TODO: set that amount only after the program and its funding rules exist. Do not invent a percent here.

## What a person is told before upload

Consent comes first. The live form has to say, in ordinary words, that Safe Ride Home keeps only:

- a `verified` flag (yes or no)
- the parish or church name
- the time of the verification decision (`verified_at`)

And that the card image:

- is stored encrypted
- is never shown on a public page
- is deleted within 24 hours after verification

The preview site uses that same explanation. In the demo, the image is drawn with a `blob:` URL and never leaves the browser. There is no upload and no storage.

## Data to store

Long-term database row, and nothing else about the card:

```text
{ verified: bool, parish_name, verified_at }
```

Do not store the image, an image URL, a file name, a faith label, a date of birth, a clergy contact, or a copy of the card text.

`docs/schema.sql` sketches the table. It is not applied.

## Image handling

1. The browser sends the image only after the consent box is checked, over TLS, to a serverless function (Cloudflare Workers or similar). TODO: choose the host.
2. The function writes the object to encrypted object storage under a random key. TODO: choose the bucket and confirm encryption at rest. The bucket is private. No public URL.
3. A verifier opens the object with a short-lived signed URL. TODO: decide who is allowed to verify. Keep that group small.
4. The verifier checks that the card matches the parish or church name the person typed, then records `verified` true or false, `parish_name`, and `verified_at`.
5. A scheduled job deletes the object within 24 hours after that decision.
6. If nobody verifies the card, a second safeguard deletes the object within 24 hours of upload so a missed review does not keep the image. No database row is written unless a decision was made.
7. The deletion job may hold the object key only until the object is gone. That key is not part of the long-term row and is not public.
8. Logs may say that an object id was viewed at a time. Logs must not contain the image.

The image is never rendered on a profile, a leaderboard, or any other public page.

## Stub

`workers/faith-card.stub.js` throws if called. It is not deployed and the website does not load it.
