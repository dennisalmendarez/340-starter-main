// controllers/savedController.js
const utilities = require("../utilities/")
const savedModel = require("../models/saved-model")

const savedController = {}

/* ****************************************
 * Build saved vehicles page
 * ************************************ */
savedController.buildSaved = async function (req, res) {
  const nav = await utilities.getNav()
  const account_id = res.locals.accountData.account_id

  const saved = await savedModel.getSavedByAccount(account_id)

  res.render("account/saved", {
    title: "Saved Vehicles",
    nav,
    errors: null,
    saved,
  })
}

/* ****************************************
 * Add saved vehicle
 * ************************************ */
savedController.addSaved = async function (req, res) {
  const account_id = res.locals.accountData.account_id
  const inv_id = parseInt(req.body.inv_id)

  if (!Number.isInteger(inv_id)) {
    req.flash("notice", "Invalid vehicle id.")
    return res.redirect("/account/saved")
  }

  const result = await savedModel.addSaved(account_id, inv_id)

  if (result) {
    req.flash("notice", "Vehicle saved.")
  } else {
    req.flash("notice", "That vehicle is already saved.")
  }

  return res.redirect(req.get("referer") || "/account/saved")
}

/* ****************************************
 * Remove saved vehicle
 * ************************************ */
savedController.removeSaved = async function (req, res) {
  const account_id = res.locals.accountData.account_id
  const inv_id = parseInt(req.body.inv_id)

  if (!Number.isInteger(inv_id)) {
    req.flash("notice", "Invalid vehicle id.")
    return res.redirect("/account/saved")
  }

  const result = await savedModel.removeSaved(account_id, inv_id)

  if (result) req.flash("notice", "Vehicle removed from saved list.")
  else req.flash("notice", "That vehicle was not in your saved list.")

  return res.redirect("/account/saved")
}

module.exports = savedController
