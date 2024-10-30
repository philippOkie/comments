const express = require("express");
const router = express.Router();
require("dotenv").config();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  try {
    const comments = await prisma.comment.findMany();
    res.json({ comments });
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { commentText, date, likes, dislikes, userId, parentId } = req.body;

    const comment = await prisma.comment.create({
      data: {
        commentText,
        date: new Date(date),
        likes,
        dislikes,
        userId,
        parentId: parentId || null,
      },
    });

    res.json({ comment });
  } catch (error) {
    console.error("Error creating comment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:id/replies", async (req, res) => {
  try {
    const parentId = parseInt(req.params.id);

    const replies = await prisma.comment.findMany({
      where: { parentId },
    });

    res.json({ replies });
  } catch (error) {
    console.error("Error fetching replies:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
