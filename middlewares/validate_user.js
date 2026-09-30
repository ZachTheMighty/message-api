const { body } = require("express-validator");
const validateResult = require("./validate_result.js");

const emptyMessage = "This field can't be empty.";
const alphaMessage = "Name can't contains numbers, symbols or whitespaces.";
const nameLengthMessage = "Name must be between 1 and 50 characters.";

module.exports = [
  body("firstName")
    .trim()
    .notEmpty()
    .withMessage(emptyMessage)
    .isAlpha()
    .withMessage(alphaMessage)
    .isLength({ min: 1, max: 50 })
    .withMessage(nameLengthMessage),
  body("lastName")
    .trim()
    .notEmpty()
    .withMessage(emptyMessage)
    .isAlpha()
    .withMessage(alphaMessage)
    .isLength({ min: 1, max: 50 })
    .withMessage(nameLengthMessage),
  validateResult,
];
