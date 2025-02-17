const prisma = require("./config/prismaClient");

const addComment = async () => {
  const response = await prisma.comment.create({
    data: {
      text: "Awesome!",
      userId: "905523b8-c2a6-4145-bbe8-e9d785a9ba3f",
      postId: "30525125-9bab-4b20-a2c9-7010e37a1d0e",
    },
  });
  console.log("comment added", response);
};

addComment();
