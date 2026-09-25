const { body, validationResult } = require("express-validator");

const emptyMessage = "This field can't be empty.";
const alphaMessage = "Name can't contains numbers, symbols or whitespaces.";
const nameLengthMessage = "Name must be between 1 and 50 characters.";
const passwordMessage =
  "Password must be between 8 and 24  characters, and must contain at least one number and one symbol.";
const passwordLengthMessage = "Password must be between 8 and 24 characters.";

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
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
    .withMessage(passwordMessage)
    .isLength({ max: 24 })
    .withMessage(passwordLengthMessage),
  body("confirmPassword")
    .trim()
    .notEmpty()
    .withMessage(emptyMessage)
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
    .withMessage(passwordMessage)
    .isLength({ max: 24 })
    .withMessage(passwordLengthMessage)
    .custom((value, { req }) => value === req.body.password)
    .withMessage("The two passwords must match."),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() });
    next();
  },
];
