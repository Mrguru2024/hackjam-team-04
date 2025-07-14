const admin = require("firebase-admin");
const serviceAccount = require("../docs/levelup-hackjam-firebase-adminsdk-fbsvc-aef4b9b584.json");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

module.exports = admin;
