/**
 * STUB ONLY. Not deployed. The static site does not load this file.
 *
 * Intended host: Cloudflare Workers or a similar serverless runtime.
 * Intended behavior, after the nonprofit exists and a real program is approved:
 *
 * 1. Accept a parish or church card image only when consent was recorded.
 * 2. Store that image in encrypted, private object storage. Never a public URL.
 * 3. A verifier decides, and the database row is only:
 *    { verified: bool, parish_name, verified_at }
 * 4. Delete the image within 24 hours after verification.
 *    Also delete it within 24 hours of upload if nobody verifies it.
 * 5. Never put the image on a public page, in the database, or in logs.
 *
 * See docs/faith-card-verification.md.
 */

function notImplemented(name) {
  throw new Error("Stub only: " + name + " is not implemented. Do not deploy this file.");
}

async function uploadFaithCard() {
  return notImplemented("uploadFaithCard");
}

async function verifyFaithCard() {
  return notImplemented("verifyFaithCard");
}

async function deleteExpiredFaithCardImages() {
  return notImplemented("deleteExpiredFaithCardImages");
}

exports.uploadFaithCard = uploadFaithCard;
exports.verifyFaithCard = verifyFaithCard;
exports.deleteExpiredFaithCardImages = deleteExpiredFaithCardImages;
