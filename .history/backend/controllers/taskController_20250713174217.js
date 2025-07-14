const Task = require("../models/Task");
const User = require("../models/User");

const XP_VALUES = {
  Learning: 10,
  Career: 15,
  Community: 20,
};

exports.logTask = async (req, res) => {
  const { firebaseUid, type, description } = req.body;

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
        name: req.body.name || "",
        email: req.body.email || "",
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
  const { firebaseUid } = req.query;
  if (!firebaseUid)
    return res.status(400).json({ message: "Missing firebaseUid" });
  try {
    const user = await User.findOne({ firebaseUid });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({
      xp: user.xp,
      badges: user.badges,
      name: user.name,
      email: user.email,
    });
  } catch (err) {
    console.error("getUser error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getUserTasks = async (req, res) => {
  const { firebaseUid } = req.query;
  if (!firebaseUid)
    return res.status(400).json({ message: "Missing firebaseUid" });
  try {
    const user = await User.findOne({ firebaseUid });
    if (!user) return res.status(404).json({ message: "User not found" });
    const tasks = await Task.find({ userId: user._id }).sort({ createdAt: -1 });
    res.status(200).json({ tasks });
  } catch (err) {
    console.error("getUserTasks error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateUserTags = async (req, res) => {
  const { firebaseUid, tags } = req.body;
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
