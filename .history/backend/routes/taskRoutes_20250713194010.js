const express = require("express");
const router = express.Router();
const verifyFirebaseToken = require("../middleware/auth");
const {
  logTask,
  getUser,
  getUserTasks,
  updateUserTags,
} = require("../controllers/taskController");

// Protect all routes with Firebase token verification
router.use(verifyFirebaseToken);

router.post("/log", logTask);
router.get("/user", getUser);
router.get("/tasks", getUserTasks);
router.post("/user/tags", updateUserTags);

module.exports = router;
