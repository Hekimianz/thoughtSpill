const express = require("express");
const route = express.Router();
const prisma = require("../config/prismaClient");

route.get("/posts", async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      where: { published: true },
    });
    res.json({ posts });
  } catch (err) {
    console.error(err);
    res.json({ error: "Internal server error" });
  }
});

module.exports = route;
