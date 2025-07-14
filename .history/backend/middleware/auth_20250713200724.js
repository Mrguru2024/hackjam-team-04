const admin = require("../firebaseAdmin");

async function verifyFirebaseToken(req, res, next) {
  const authHeader = req.headers.authorization;
  console.log("Auth header:", authHeader); // Debug log
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.log("No token provided"); // Debug log
    return res.status(401).json({ message: "No token provided" });
  }
  const idToken = authHeader.split(" ")[1];
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    console.log("Decoded token:", decodedToken); // Debug log
    req.firebaseUid = decodedToken.uid;
    next();
  } catch (err) {
    console.error("Error verifying Firebase ID token:", err); // Debug log
    return res.status(401).json({ message: "Invalid token" });
  }
}

module.exports = verifyFirebaseToken;
