const express = require("express");
const User = require("../schema"); 
const router = express.Router();

// Create a new user
router.post("/create", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json({ message: "User created successfully", user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update user roles
router.patch("/:id/roles", async (req, res) => {
  try {
    const { id } = req.params;
    const { roles } = req.body;
    const user = await User.findByIdAndUpdate(
      id,
      { roles },
      { new: true, runValidators: true }
    );
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "Roles updated", user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Record last login
router.patch("/:id/lastLogin", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(
      id,
      { lastLogin: new Date() },
      { new: true }
    );
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "Last login updated", user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a user
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
