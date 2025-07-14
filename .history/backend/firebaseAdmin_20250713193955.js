const admin = require("firebase-admin");

if (!admin.apps.length) {
  admin.initializeApp({
    // For local dev, use applicationDefault(). For production, use a service account key.
    credential: admin.credential.applicationDefault(),
    // credential: admin.credential.cert(require("./serviceAccountKey.json")),
  });
}

module.exports = admin;
