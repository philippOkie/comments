const express = require("express");
const router = express.Router();

const Joi = require("joi");
const axios = require("axios");

require("dotenv").config();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const uuidRegex =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;

const secretKey = process.env.CAPTCHA_SECRET_KEY;
if (!secretKey) {
  return res
    .status(500)
    .json({ error: "Internal server error: missing secret key" });
}

const commentSchema = Joi.object({
  commentText: Joi.string().min(1).max(500).required(),
  date: Joi.date().iso(),
  likes: Joi.number().integer().min(0),
  dislikes: Joi.number().integer().min(0),
  userId: Joi.string().uuid().required(),
  parentId: Joi.string().uuid().allow(null),
  captchaToken: Joi.string().required(), // CAPTCHA token from client
});

const validateComment = async (req, res, next) => {
  try {
    await commentSchema.validateAsync(req.body, { abortEarly: false });

    const captchaToken = req.body.captchaToken;
    const isValid = await verifyCaptcha(captchaToken);

    if (!isValid) {
      return res.status(400).json({ error: "Invalid CAPTCHA" });
    }

    next();
  } catch (error) {
    const errorMessage = error.details?.[0].message || "Invalid input";
    return res.status(400).json({ error: errorMessage });
  }
};

const verifyCaptcha = async (captchaToken) => {
  const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${captchaToken}`;

  try {
    const response = await axios.post(url);
    return response.data.success;
  } catch (error) {
    console.error("CAPTCHA verification failed:", error);
    return false;
  }
};

router.get("/", async (req, res) => {
  try {
    const comments = await prisma.comment.findMany({
      where: {
        parentId: null,
      },
      select: {
        id: true,
        commentText: true,
        date: true,
        likes: true,
        dislikes: true,
        parentId: true,
        hasReplies: true,
        user: {
          select: {
            profileImage: true,
            username: true,
          },
        },
      },
    });
    res.json({ comments });
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { commentText, date, likes, dislikes, parentId, email, username } =
      req.body;

    const user = await prisma.user.findFirst({
      where: {
        AND: [{ email }, { username }],
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const userId = user.id;

    const comment = await prisma.comment.create({
      data: {
        commentText,
        date: new Date(date),
        likes,
        dislikes,
        userId,
        parentId,
      },
    });

    if (parentId) {
      await prisma.comment.update({
        where: { id: parentId },
        data: {
          hasReplies: true,
        },
      });
    }

    res.json({ comment });
  } catch (error) {
    console.error("Error creating comment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const parentId = req.params.id;

    if (!parentId || parentId === "null" || !uuidRegex.test(parentId)) {
      return res.status(400).json({ error: "Invalid parentId" });
    }

    const replies = await prisma.comment.findMany({
      where: {
        parentId: parentId,
      },
      select: {
        id: true,
        commentText: true,
        date: true,
        likes: true,
        dislikes: true,
        parentId: true,
        hasReplies: true,
        user: {
          select: {
            profileImage: true,
            username: true,
          },
        },
      },
    });

    res.json({ replies });
  } catch (error) {
    console.error("Error fetching replies:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
