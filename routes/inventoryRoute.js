// inventoryRoute.js - routes for inventory-related endpoints
// Needed Resources
const express = require("express")
const router = new express.Router()
const invController = require("../controllers/invController")
const utilities = require("../utilities/")
const validate = require("../utilities/inventory-validation")

// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);
// Route to build inventory by detail view
router.get("/detail/:invId", utilities.handleErrors(invController.buildByInventoryId));
// Route to build broken view (Intentional 500 error)
router.get("/broken", utilities.handleErrors(invController.buildBroken));
// Route to build inventory management view
router.get("/", utilities.handleErrors(invController.buildManagement));
// Route to show add-classification view
router.get("/add-classification", utilities.handleErrors(invController.buildAddClassification));

// Route to process add-classification form
router.post(
  "/add-classification",
  validate.classificationRules(),
  validate.checkClassificationData,
  utilities.handleErrors(invController.addClassification)
)
// Route to build add inventory view
router.get("/add-inventory", utilities.handleErrors(invController.buildAddInventory));

// Route to process add inventory
router.post(
  "/add-inventory",
  validate.newInventoryRules(),
  validate.checkInventoryData,
  utilities.handleErrors(invController.addInventory)
)

module.exports = router;