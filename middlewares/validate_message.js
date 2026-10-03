const { body } = require("express-validator");
const validateResult = require("./validate_result.js");

module.exports = [
  body("content").notEmpty().withMessage("Message content can't be empty."),
  validateResult,
];
