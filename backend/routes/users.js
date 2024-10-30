const express = require("express");
const router = express.Router();

const db = require("../db/queries");

router.get("/", async (req, res) => {
  try {
    const usernames = await db.getAllUsernames();
    res.json({ users: usernames });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
