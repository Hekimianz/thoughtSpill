require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 3000;
const authRoutes = require("./routes/auth");
const apiRoutes = require("./routes/api");
const { authenticateToken } = require("./middlewares/auth");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "https://thoughtspill-admin.netlify.app",
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/auth", authRoutes);

app.use("/api", apiRoutes);

app.get("/", authenticateToken, (req, res) => {
  res.json({ user: req.user });
});

app.listen(PORT, () => console.log("Server runing on port: " + PORT));
