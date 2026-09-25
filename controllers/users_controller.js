const prisma = require("../lib/prisma.ts");
const validateUser = require("../middlewares/validate_sign_up.js");
const { matchedData, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const createUser = [
  validateUser,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() });

    const { firstName, lastName, email, password } = matchedData(req);

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

module.exports = { createUser };
