const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const validator = require("../utilities/validator");
const authController = require("../controller/auth");
const { authMiddleware } = require("../middleware/auth");

router.post(
     "/signup",
     [
          check("firstName")
               .not()
               .isEmpty()
               .withMessage("first_name field is required"),
          check("userName").not().isEmpty().withMessage("email field is required"),
     ],
     validator,
     authController.signup
);

router.post(
     "/login",
     [
          check("userName").not().isEmpty().withMessage("Email field is required"),
          check("password").not().isEmpty().withMessage("password field is required"),
     ],
     validator,
     authController.signin
);

router.get("/getUser/:id", authController.getUser);


module.exports = router;
