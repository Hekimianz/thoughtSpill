const prisma = require("../config/prismaClient");

exports.getPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      where: { published: true },
    });
    res.json({ posts });
  } catch (err) {
    console.error(err);
    res.json({ error: "Internal server error" });
  }
};

exports.getPost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await prisma.post.findUnique({
      where: { id },
    });
    res.json({ post });
  } catch (err) {
    console.error(err);
    res.json({ error: "Internal server error" });
  }
};

exports.getComments = async (req, res) => {
  try {
    const postId = req.params.id;
    const comments = await prisma.comment.findMany({
      where: { postId },
    });
    res.json({ comments });
  } catch (err) {
    console.error(err);
    res.json({ error: "Internal server error" });
  }
};
