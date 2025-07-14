const Task = require("../models/Task");
const User = require("../models/User");

const XP_VALUES = {
  Learning: 10,
  Career: 15,
  Community: 20,
};

exports.logTask = async (req, res) => {
  const { type, description, name, email } = req.body;
  const firebaseUid = req.firebaseUid;

  if (!firebaseUid || !type) {
    return res.status(400).json({ message: "Missing firebaseUid or type" });
  }

  const xp = XP_VALUES[type] || 0;

  try {
    let user = await User.findOne({ firebaseUid });
    if (!user) {
      // Auto-create user if not found
      user = await User.create({
        firebaseUid,
        name: name || "",
        email: email || "",
        xp: 0,
        badges: [],
      });
    }

    const task = await Task.create({
      userId: user._id,
      type,
      description,
      xpAwarded: xp,
    });

    user.xp += xp;

    // Optional badge logic
    if (user.xp >= 30 && !user.badges.includes("Initiator")) {
      user.badges.push("Initiator");
    }

    await user.save();

    res.status(200).json({ message: "Task logged", task, user });
  } catch (err) {
    console.error("logTask error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getUser = async (req, res) => {
  const firebaseUid = req.firebaseUid;
  // Try to get name/email from decoded token if available
  const name = req.userName || "";
  const email = req.userEmail || "";
  if (!firebaseUid)
    return res.status(400).json({ message: "Missing firebaseUid" });
  try {
    let user = await User.findOne({ firebaseUid });
    if (!user) {
      // Auto-create user if not found
      user = await User.create({
        firebaseUid,
        name,
        email,
        xp: 0,
        badges: [],
        tags: [],
      });
    }
    res.status(200).json({
      xp: user.xp,
      badges: user.badges,
      name: user.name,
      email: user.email,
      tags: user.tags, // Add tags to the response
    });
  } catch (err) {
    console.error("getUser error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getUserTasks = async (req, res) => {
  const firebaseUid = req.firebaseUid;
  const name = req.userName || "";
  const email = req.userEmail || "";
  if (!firebaseUid)
    return res.status(400).json({ message: "Missing firebaseUid" });
  try {
    let user = await User.findOne({ firebaseUid });
    if (!user) {
      // Auto-create user if not found
      user = await User.create({
        firebaseUid,
        name,
        email,
        xp: 0,
        badges: [],
        tags: [],
      });
    }
    const tasks = await Task.find({ userId: user._id }).sort({ createdAt: -1 });
    res.status(200).json({ tasks });
  } catch (err) {
    console.error("getUserTasks error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateUserTags = async (req, res) => {
  const firebaseUid = req.firebaseUid;
  const { tags } = req.body;
  if (!firebaseUid || !Array.isArray(tags)) {
    return res.status(400).json({ message: "Missing firebaseUid or tags" });
  }
  try {
    const user = await User.findOneAndUpdate(
      { firebaseUid },
      { tags },
      { new: true }
    );
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "Tags updated", tags: user.tags });
  } catch (err) {
    console.error("updateUserTags error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
