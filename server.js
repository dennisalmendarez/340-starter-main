/* ***********************
 * Require Statements
 *************************/
const express = require("express")
const expressLayouts = require("express-ejs-layouts")
const env = require("dotenv").config()
const app = express()
const static = require("./routes/static")
const baseController = require("./controllers/baseController")
const inventoryRoute = require("./routes/inventoryRoute")

/* ***********************
 * View Engine and Templates
 *************************/
app.set("view engine", "ejs")
app.use(expressLayouts)
app.set("layout", "./layouts/layout") // looks in views/layouts/layout.ejs

/* ***********************
 * Routes
 *************************/
// Static files (CSS, images, etc.) - IMPORTANT ADDITION
app.use(express.static("public")) 
app.use("/inv", inventoryRoute)

// Application routes
app.use(static)
app.get("/", baseController.buildHome)

/* ***********************
 * Local Server Information
 *************************/
const port = process.env.PORT
const host = process.env.HOST

/* ***********************
 * Log statement
 *************************/
app.listen(port, () => {
  console.log(`app listening on ${host}:${port}`)
})