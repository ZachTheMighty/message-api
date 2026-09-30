const prisma = require("../lib/prisma.ts");
const validateSignUp = require("../middlewares/validate_sign_up.js");
const validateUser = require("../middlewares/validate_user.js");
const { matchedData } = require("express-validator");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const { createClient } = require("@supabase/supabase-js");

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
  upload.single("file"),
  validateSignUp,
  async (req, res) => {
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_KEY,
    );

    const filePath = `${Date.now()}_${req.file.originalname}`;

    try {
      const { error } = await supabase.storage
        .from("files")
        .upload(filePath, req.file.buffer, {
          contentType: req.file.mimetype,
          upsert: false,
        });
      if (error) throw error;
    } catch (error) {
      throw error;
    }

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
        photo: supabase.storage.from("files").getPublicUrl(filePath).data
          .publicUrl,
        email,
        password: await bcrypt.hash(password, 10),
      },
    });
    res.json(user);
  },
];

const updateUserById = [
  validateUser,
  async (req, res) => {
    const { firstName, lastName } = matchedData(req);
    const updatedUser = await prisma.user.update({
      where: { id: +req.params.userId },
      data: {
        firstName,
        lastName,
      },
    });
    res.json(updatedUser);
  },
];

module.exports = { createUser, getAllUsers, updateUserById };
