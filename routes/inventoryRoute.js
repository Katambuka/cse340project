// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController");
const utilities = require("../utilities/");

// Route to build inventory by classification view
router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId));


// Route to build inventory item detail view
router.get("/detail/:itemId", utilities.handleErrors(invController.buildByItemId));


// Route to add classification
router.get("/", utilities.handleErrors(invController.BuildManagementPage));

// Route to add classification
router.get("/add-classification", utilities.handleErrors(invController.BuildNewClassifiation));

// Route to add a new vehicle
router.get("/add-inventory", utilities.handleErrors(invController.BuildNewVehicle));

//Get inventory for AJAX Route
router.get("/getInventory/:classification_id", utilities.handleErrors(invController.getInventoryJSON))

// Route for adding a product to an existing
module.exports = router;
