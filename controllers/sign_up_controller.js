const prisma = require("../lib/prisma.ts");
const validateSignUp = require("../middlewares/validate_sign_up.js");
const { matchedData } = require("express-validator");
const bcrypt = require("bcryptjs");
const authenticateUser = require("../middlewares/authenticate.js");

const getAllUsers = [
  authenticateUser,
  async (req, res) => {
    const users = await prisma.user.findMany();
    res.json(users);
  },
];

const createUser = [
  validateSignUp,
  async (req, res) => {
    const { firstName, lastName, email, password } = matchedData(req);

    if (
      await prisma.user.findUnique({
        where: { email },
      })
    )
      return res
        .status(422)
        .json({ errors: "An account with this email already exists." });

    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: await bcrypt.hash(password, 10),
      },
    });
    res.json(user);
  },
];

module.exports = { createUser, getAllUsers };
