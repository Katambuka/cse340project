const express = require("express");
const router = new express.Router(); 
const accountController = require("../controllers/accountController");
const utilities = require("../utilities" );
const regValidate = require("../utilities/account-validation")


// Route to add classification
router.get("/", utilities.checkLogin, utilities.handleErrors(accountController.buildAccountManagement));

//Deliver Login View
router.get("/login", utilities.handleErrors(accountController.buildLogin));

// Process Login
router.post(
  "/login", 
  regValidate.loginRules(), 
  regValidate.checkLoginData, 
  utilities.handleErrors(accountController.accountLogin)
)

//Deliver Registration View
router.get("/register", utilities.handleErrors(accountController.buildRegister))

// Process registration
router.post(
  "/register", 
  regValidate.registrationRules(), 
  regValidate.checkRegData, 
  utilities.handleErrors(accountController.registerAccount)
)


module.exports = router;