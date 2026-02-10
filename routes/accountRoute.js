// public/routes/accountRoute.js

const express = require("express")
const router = new express.Router()
const accountController = require("../controllers/accountController")
const utilities = require("../utilities/")
const validate = require("../utilities/accountValidation")

router.get("/login", utilities.handleErrors(accountController.buildLogin))
router.get("/register", utilities.handleErrors(accountController.buildRegister))

// 🔹 DEFAULT ACCOUNT ROUTE (ADD THIS)
router.get(
  "/",
  utilities.checkLogin,
  utilities.handleErrors(accountController.buildAccount)
)

router.post(
  "/register",
  validate.registationRules(),
  validate.checkRegData,
  utilities.handleErrors(accountController.registerAccount)
)

// Process the login attempt
router.post(
  "/login",
  validate.loginRules(),
  validate.checkLoginData,
  utilities.handleErrors(accountController.accountLogin)
)

module.exports = router
