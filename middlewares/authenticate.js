const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
  if (!req.headers["authorization"])
    return res
      .status(403)
      .json({ errors: "You need to log in in order to view this resource." });

  const token = req.headers["authorization"].split(" ")[1];
  jwt.verify(token, process.env.SECRET, (error, payload) => {
    if (error) return res.status(403).json({ error, isAuth: false });

    req.payload = payload;
    next();
  });
};
