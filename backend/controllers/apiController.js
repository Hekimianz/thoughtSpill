const prisma = require("../config/prismaClient");

exports.getPosts = async (req, res) => {
  try {
    const { title } = req.query;
    if (title) {
      const posts = await prisma.post.findMany({
        where: {
          title: {
            contains: title,
            mode: "insensitive",
          },
        },
      });

      res.json({ posts });
    } else {
      const posts = await prisma.post.findMany();
      return res.json({ posts });
    }
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

exports.updatePost = async (req, res) => {
  try {
    const {
      pages,
      title,
      date_published,
      author,
      cover_url,
      published,
      isbn,
      thoughts,
      date_read,
    } = req.body;
    const id = req.params.id;
    const updatedBook = await prisma.post.update({
      where: { id },
      data: {
        pages,
        title,
        date_published,
        author,
        cover_url,
        published,
        isbn,
        thoughts,
        date_read,
      },
    });
    console.log(updatedBook);
    res.json({ message: "updated book", book: updatedBook });
  } catch (err) {
    console.error(err);
    res.json({ error: "Interna server error" });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedBook = await prisma.post.delete({
      where: { id },
    });
    console.log("Book deleted:", deletedBook);
    res.json({ message: "Book deleted", book: deletedBook });
  } catch (err) {
    console.error(err);
    res.json({ error: "Internal server error" });
  }
};

exports.addPost = async (req, res) => {
  try {
    const { pages, title, date_published, author, cover_url, isbn, date_read } =
      req.body;

    const newBook = await prisma.post.create({
      data: {
        pages: +pages,
        title,
        date_published,
        author,
        cover_url,
        isbn,
        date_read,
      },
    });
    console.log(newBook);
    res.json({ message: "Book created", newBook });
  } catch (error) {
    console.error(error);
    res.json({ error: "Internal server error" });
  }
};

exports.getUsername = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: { id },
    });

    res.json({ message: "user found", user: user.username });
  } catch (err) {
    console.log(err);
    res.json({ error: "Internal server error" });
  }
};

exports.postComment = async (req, res) => {
  try {
    const { text, userId } = req.body;
    const { id: postId } = req.params;

    if (!text || typeof text !== "string" || text.trim().length === 0) {
      return res.status(400).json({ error: "Comment text cannot be empty" });
    }
    if (!userId || typeof userId !== "string") {
      return res.status(400).json({ error: "Invalid or missing userId" });
    }

    const comment = await prisma.comment.create({
      data: {
        text: text.trim(),
        userId,
        postId,
      },
    });

    res.status(201).json({
      message: "Comment created successfully",
      comment,
    });
  } catch (err) {
    console.error("Error posting comment:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
