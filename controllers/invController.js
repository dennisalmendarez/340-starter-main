// invController.js - controller for inventory routes
const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  })
}

/* ***************************
 * Build inventory detail view
 * ************************** */
invCont.buildByInventoryId = async function (req, res, next) {
  const inv_id = req.params.invId
  const data = await invModel.getInventoryByInventoryId(inv_id)
  
  // VALIDATION: If the car doesn't exist, we must stop here to prevent a crash
  if(!data) {
     next({status: 404, message: 'Sorry, we cannot find that vehicle.'})
     return
  }

  const grid = await utilities.buildInventoryDetail(data)
  let nav = await utilities.getNav()
  const title = data.inv_make + " " + data.inv_model
  res.render("./inventory/detail", {
    title: title,
    nav,
    grid,
  })
}

/* ***************************
 * Build broken view (Intentional 500 error)
 * ************************** */
invCont.buildBroken = async function (req, res, next) {
  // Creating a 500 error intentionally
  let nav = await utilities.getNav()
  res.render("inventory/broken", { // This view doesn't exist, or we can just throw error
      title: "Broken",
      nav
  })
  // Ideally, the assignment wants an actual error thrown in code, like:
  // throw new Error("This is a forced 500 error.")
}

module.exports = invCont