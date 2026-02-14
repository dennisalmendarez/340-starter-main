// routes/savedRoute.js
const express = require("express")
const router = new express.Router()

const utilities = require("../utilities/")
const savedController = require("../controllers/savedController")

// View saved vehicles
router.get(
  "/",
  utilities.checkLogin,
  utilities.handleErrors(savedController.buildSaved)
)

// Save a vehicle
router.post(
  "/add",
  utilities.checkLogin,
  utilities.handleErrors(savedController.addSaved)
)

// Remove a vehicle
router.post(
  "/remove",
  utilities.checkLogin,
  utilities.handleErrors(savedController.removeSaved)
)

module.exports = router
