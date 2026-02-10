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


// Route to return JSON data for AJAX
router.get("/getInventory/:classification_id", utilities.handleErrors(invController.getInventoryJSON))

// Route to build edit inventory view
router.get(
  "/edit/:inv_id", utilities.handleErrors(invController.editInventoryView)
)

// Route to process add inventory
router.post(
  "/add-inventory",
  validate.newInventoryRules(),
  validate.checkInventoryData,
  utilities.handleErrors(invController.addInventory)
)

// Route to handle the actual update of inventory data
router.post(
  "/update/",
  validate.newInventoryRules(),
  validate.checkUpdateData,
  utilities.handleErrors(invController.updateInventory)
)

// Route to build delete confirmation view
router.get(
  "/delete/:inv_id", 
  utilities.handleErrors(invController.deleteView)
);

// Route to handle the deletion process
router.post(
  "/delete/", 
  utilities.handleErrors(invController.deleteItem)
);

module.exports = router;