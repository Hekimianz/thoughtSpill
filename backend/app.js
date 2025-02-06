require("dotenv").config();
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const app = express();
const PORT = process.env.PORT || 3000;
const authRoutes = require("./routes/auth");
const apiRoutes = require("./routes/api");
const { authenticateToken } = require("./middlewares/auth");

app.use(express.json());
app.use(cors());

app.use("/auth", authRoutes);

app.use("/api", apiRoutes);

app.get("/", authenticateToken, (req, res) => {
  res.json({ user: req.user });
});

app.listen(PORT, () => console.log("Server runing on port: " + PORT));
