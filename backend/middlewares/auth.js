const jwt = require("jsonwebtoken");

exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader.split(" ")[1];
  if (token == null) return res.json({ error: null });
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.json({ error: err });
    req.user = user;
    next();
  });
};
