const prisma = require("../config/prismaClient");

exports.getPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany();
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
