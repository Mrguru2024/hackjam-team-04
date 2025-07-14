const express = require("express");
const router = express.Router();
const {
  logTask,
  getUser,
  getUserTasks,
  updateUserTags,
} = require("../controllers/taskController");

router.post("/log", logTask);
router.get("/user", getUser);
router.get("/tasks", getUserTasks);
router.post("/user/tags", updateUserTags);

module.exports = router;
