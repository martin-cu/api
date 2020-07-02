const { body } = require('express-validator');

const registerValidation = [
  body('lastName').not().isEmpty().withMessage("Last Name is required."),
  body('firstName').not().isEmpty().withMessage("Last Name is required."),
  // Username
  body('usernameR').not().isEmpty().withMessage("Username is required."),

  // Password needs to be min 8 chars
  body('password').isLength({ min: 6 }).withMessage("Password must be at least 6 characters long."),
];

const loginValidation = [
  // Email should not be empty and must be a valid email
  body('username').not().isEmpty().withMessage("Username is required."),
  // Password should not be empty and needs to be min 6 chars
  body('password').not().isEmpty().withMessage("Password is required.")
];

const updateAccountValidation = [
  // Password needs to be min 8 chars
  body('newPass').isLength({ min: 8 }).withMessage("New password must be at least 8 characters long."),
  // Confirm Password needs to be min 8 chars AND must match the req.body.password field
  body('conPass').custom((value, { req }) => {
      if (value !== req.body.oldPass) {
        throw new Error("Passwords must match.");
      }
      return true;
    })
];

const myPasswordValidate = [
  body('oldP').not().isEmpty().withMessage("Missing current password field."),
  body('newP').isLength({ min: 6 }).withMessage("New password must be at least 6 characters long."),
  body('conP').custom((value, { req }) => {
    console.log(value+'-'+req.body.newP)
      if (value !== req.body.newP) {
        throw new Error("Passwords must match.");
      }
      return true;
    })
];

// update exports
module.exports = { registerValidation, loginValidation, updateAccountValidation, myPasswordValidate };