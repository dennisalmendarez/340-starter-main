// inventoryRoute.js - routes for inventory-related endpoints
// Needed Resources
const express = require("express")
const router = new express.Router()
const invController = require("../controllers/invController")
const utilities = require("../utilities/")

// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);
// Route to build inventory by detail view
router.get("/detail/:invId", utilities.handleErrors(invController.buildByInventoryId));
// Route to build broken view (Intentional 500 error)
router.get("/broken", utilities.handleErrors(invController.buildBroken));

module.exports = router;