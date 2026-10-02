const prisma = require("../lib/prisma.ts");
const validateSignUp = require("../middlewares/validate_sign_up.js");
const validateUser = require("../middlewares/validate_user.js");
const { matchedData } = require("express-validator");
const bcrypt = require("bcryptjs");
const uploadImage = require("../middlewares/upload_image.js");

const getAllUsers = [
  async (req, res) => {
    const users = await prisma.user.findMany();
    const loggedInUser = await prisma.user.findUnique({
      where: { id: req.payload.user.id },
    });
    res.json({ users, loggedInUser });
  },
];

const createUser = [
  uploadImage,
  validateSignUp,
  async (req, res) => {
    const { firstName, lastName, email, password } = matchedData(req);

    if (
      await prisma.user.findUnique({
        where: { email },
      })
    )
      return res
        .status(409)
        .json({ errors: "An account with this email already exists." });

    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        photo: req.imageUrl,
        email,
        password: await bcrypt.hash(password, 10),
      },
    });
    res.json(user);
  },
];

const updateUserById = [
  uploadImage,
  validateUser,
  async (req, res) => {
    const { firstName, lastName } = matchedData(req);
    const updatedUser = await prisma.user.update({
      where: { id: +req.params.userId },
      data: {
        firstName,
        lastName,
        photo: req.imageUrl,
      },
    });
    res.json(updatedUser);
  },
];

module.exports = { createUser, getAllUsers, updateUserById };
