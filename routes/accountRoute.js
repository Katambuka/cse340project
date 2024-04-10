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

// Route to logout
router.get("/logout", utilities.handleErrors(accountController.accountLogout));

// Process registration
router.post(
  "/register", 
  regValidate.registrationRules(), 
  regValidate.checkRegData, 
  utilities.handleErrors(accountController.registerAccount)
)

// Route to logout
router.get("/logout", utilities.handleErrors(accountController.accountLogout));

// Update account handlers
router.get("/update/:accountId", utilities.handleErrors(accountController.buildUpdate));
router.post("/update",
  regValidate.updateRules(), 
  regValidate.checkUpdateData,
  utilities.handleErrors(accountController.updateAccount)
  );
  
router.post(
  "/update-password",
  regValidate.updatePasswordRules(),
  regValidate.checkUpdatePasswordData,
  utilities.handleErrors(accountController.updatePassword)
);

module.exports = router;