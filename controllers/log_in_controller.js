const validateLogIn = require("../middlewares/validate_log_in.js");
const prisma = require("../lib/prisma.ts");
const { matchedData } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const createToken = [
  validateLogIn,
  async (req, res) => {
    const { email, password } = matchedData(req);

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user)
      res.status(401).json({ errors: "Incorrect email", path: "email" });

    if (!(await bcrypt.compare(password, user.password)))
      return res
        .status(401)
        .json({ errors: "Incorrect password", path: "password" });

    jwt.sign(
      { user },
      process.env.SECRET,
      { expiresIn: "30s" },
      (error, token) => res.json({ token }),
    );
  },
];

module.exports = { createToken };
