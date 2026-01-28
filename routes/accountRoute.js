// public/routes/accountRoute.js

const express = require("express")
const router = new express.Router()
const accountController = require("../controllers/accountController")
const utilities = require("../utilities/")
const validate = require("../utilities/accountValidation")

router.get("/login", utilities.handleErrors(accountController.buildLogin));
router.get("/register", utilities.handleErrors(accountController.buildRegister))

router.post(
  "/register",
  validate.registationRules(),
  validate.checkRegData,
  utilities.handleErrors(accountController.registerAccount)
)

module.exports = router;