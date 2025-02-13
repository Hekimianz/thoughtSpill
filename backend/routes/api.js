const express = require("express");
const route = express.Router();
const apiController = require("../controllers/apiController");

route.get("/posts", apiController.getPosts);
route.get("/posts/:id", apiController.getPost);
route.get("/posts/comments/:id", apiController.getComments);
route.put("/posts/:id", apiController.updatePost);
module.exports = route;
