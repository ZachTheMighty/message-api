const { body } = require("express-validator");
const validateResult = require("./validate_result.js");

const emptyMessage = "This field can't be empty.";

module.exports = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage(emptyMessage)
    .isEmail()
    .withMessage("Email must be in the format a@b.domain."),
  body("password")
    .trim()
    .notEmpty()
    .withMessage(emptyMessage)
    .isStrongPassword({
      minLength: 8,
      minNumbers: 1,
      minUppercase: 1,
      minLowercase: 1,
      minSymbols: 1,
    })
    .withMessage(
      "Password must be between 8 and 24  characters, and must contain at least one number and one symbol.",
    )
    .isLength({ max: 24 })
    .withMessage("Password must be between 8 and 24 characters."),
  validateResult,
];
