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

router.get("/logout", accountController.accountLogout)

// Route to deliver the account update view
router.get(
  "/update/:accountId", 
  utilities.handleErrors(accountController.buildAccountUpdate)
)

// Route to process account information update
router.post(
  "/update-info", 
  validate.registationRules(), 
  validate.checkUpdateData, 
  utilities.handleErrors(accountController.updateAccount)
)

// Route to process password change request
router.post(
  "/update-password", 
  validate.passwordRules(), 
  utilities.handleErrors(accountController.updatePassword)
)

module.exports = router
