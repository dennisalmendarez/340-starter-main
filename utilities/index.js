// utilities/index.js - utility functions for the application
const invModel = require("../models/inventory-model")
const Util= {}
const jwt = require("jsonwebtoken")
require("dotenv").config()

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNav = async function (req, res, next) {
  let data = await invModel.getClassifications()
  let list = "<ul>"
  list += '<li><a href="/" title="Home page">Home</a></li>'
  data.rows.forEach((row) => {
    list += "<li>"
    list +=
      '<a href="/inv/type/' +
      row.classification_id +
      '" title="See our inventory of ' +
      row.classification_name +
      ' vehicles">' +
      row.classification_name +
      "</a>"
    list += "</li>"
  })
  list += "</ul>"
  return list
}

/* **************************************
* Build the classification view HTML
* ************************************ */
Util.buildClassificationGrid = async function(data){
  let grid
  if(data.length > 0){
    grid = '<ul id="inv-display">'
    data.forEach(vehicle => { 
      
      // FIX: Add '/vehicles' to the path if it's missing
      let thumb = vehicle.inv_thumbnail
      if (thumb.includes('/images/') && !thumb.includes('/vehicles/')) {
        thumb = thumb.replace('/images/', '/images/vehicles/')
      }

      grid += '<li>'
      grid +=  '<a href="../../inv/detail/'+ vehicle.inv_id 
      + '" title="View ' + vehicle.inv_make + ' '+ vehicle.inv_model 
      + 'details"><img src="' + thumb 
      +'" alt="Image of '+ vehicle.inv_make + ' ' + vehicle.inv_model 
      +' on CSE Motors" /></a>'
      grid += '<div class="namePrice">'
      grid += '<hr />'
      grid += '<h2>'
      grid += '<a href="../../inv/detail/' + vehicle.inv_id +'" title="View ' 
      + vehicle.inv_make + ' ' + vehicle.inv_model + ' details">' 
      + vehicle.inv_make + ' ' + vehicle.inv_model + '</a>'
      grid += '</h2>'
      grid += '<span>$' 
      + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span>'
      grid += '</div>'
      grid += '</li>'
    })
    grid += '</ul>'
  } else { 
    grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
  }
  return grid
}

/* **************************************
* Build the inventory detail view HTML
* ************************************ */
Util.buildInventoryDetail = async function(vehicle) {
  let grid
  if(vehicle){
    const price = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(vehicle.inv_price)

    const miles = new Intl.NumberFormat('en-US').format(vehicle.inv_miles)

    // LOGIC TO FIX IMAGE PATHS
    let imgPath = vehicle.inv_image;
    if (imgPath.includes('/images/') && !imgPath.includes('/vehicles/')) {
        imgPath = imgPath.replace('/images/', '/images/vehicles/');
    }

    grid = '<div id="inv-details">'
    
    // 1. Image Container
    grid += '<div class="detail-image">'
    grid += '<img src="' + imgPath + '" alt="Image of ' + vehicle.inv_make + ' ' + vehicle.inv_model + ' on CSE Motors" />'
    grid += '</div>'
    
    // 2. Details Container
    grid += '<div class="details-content">'
    
        // Price Box
        grid += '<div class="price-box">'
        grid += '<h2>No-Haggle Price</h2>'
        grid += '<h2 class="price-display">' + price + '</h2>'
        grid += '</div>'

        // Specs List (Make, Model, Year, Miles)
        grid += '<div class="specs-list">'
        grid += '<p><strong>Make:</strong> ' + vehicle.inv_make + '</p>'
        grid += '<p><strong>Model:</strong> ' + vehicle.inv_model + '</p>'
        grid += '<p><strong>Year:</strong> ' + vehicle.inv_year + '</p>'
        grid += '<p><strong>Mileage:</strong> ' + miles + '</p>'
        grid += '<p><strong>Color:</strong> ' + vehicle.inv_color + '</p>'
        grid += '</div>'

        grid += '<p class="desc"><strong>Description:</strong> ' + vehicle.inv_description + '</p>'
    
    grid += '</div>'
    grid += '</div>'
  } else { 
    grid += '<p class="notice">Sorry, vehicle details could not be found.</p>'
  }
  return grid
}

/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for 
 * General Error Handling
 **************************************** */
Util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)

/* ****************************************
 * Construct the classification select list
 * **************************************** */
Util.buildClassificationList = async function (classification_id = null) {
  let data = await invModel.getClassifications()
  let classificationList =
    '<select name="classification_id" id="classificationList" required>'
  classificationList += "<option value=''>Choose a Classification</option>"
  data.rows.forEach((row) => {
    classificationList += '<option value="' + row.classification_id + '"'
    if (
      classification_id != null &&
      row.classification_id == classification_id
    ) {
      classificationList += " selected "
    }
    classificationList += ">" + row.classification_name + "</option>"
  })
  classificationList += "</select>"
  return classificationList
}

/* ****************************************
* Middleware to check token validity
**************************************** */
Util.checkJWTToken = (req, res, next) => {
 if (req.cookies.jwt) {
  jwt.verify(
   req.cookies.jwt,
   process.env.ACCESS_TOKEN_SECRET,
   function (err, accountData) {
    if (err) {
     req.flash("notice", "Please log in")
     res.clearCookie("jwt")
     return res.redirect("/account/login")
    }
    res.locals.accountData = accountData
    res.locals.loggedin = 1
    next()
   })
 } else {
  next()
 }
}

/* ****************************************
 *  Check Login
 * ************************************ */
 Util.checkLogin = (req, res, next) => {
  if (res.locals.loggedin) {
    next()
  } else {
    req.flash("notice", "Please log in.")
    return res.redirect("/account/login")
  }
 }

/* ****************************************
 * Check Account Type (Authorization)
 * ************************************ */
Util.checkAccountType = (req, res, next) => {
  if (res.locals.loggedin && 
     (res.locals.accountData.account_type === 'Employee' || 
      res.locals.accountData.account_type === 'Admin')) {
    next()
  } else {
    req.flash("notice", "Please log in with an administrative account.")
    return res.redirect("/account/login")
  }
}

module.exports = Util