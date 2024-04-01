const invModel = require("../models/inventory-model");
const utilities = require("../utilities/");

const invCont = {};

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
};

/* ***************************
 *  Build inventory by item view
 * ************************** */

/*invCont.buildByItemId = async function (req, res, next) {
  const itemId = req.params.itemId
  const data = await invModel.getInventoryByItemId(itemId)
  const grid = await utilities.buildItemGrid(data)
  let nav = await utilities.getNav()
  const itemName = `${data[0].inv_year} ${data[0].inv_make} ${data[0].inv_model}`
  res.render("./inventory/item", {
    title: itemName,
    nav,
    grid,
  })
};*/
invCont.buildByItemId = async function (req, res, next) {
  try {
    const itemId = req.params.itemId;
    const data = await invModel.getInventoryByItemId(itemId);

    if (data && data.length > 0) {
      const grid = await utilities.buildItemGrid(data);
      const nav = await utilities.getNav();
      const itemName = `${data[0].inv_year} ${data[0].inv_make} ${data[0].inv_model}`;
      
      res.render("./inventory/items", {
        title: itemName,
        nav,
        grid,
      });
    } else {
      throw new Error("No data found for the provided item ID");
    }
  } catch (error) {
    console.error("Error in buildByItemId:", error);
    next(error);
  }
};

/* ****************************************
*  Deliver Vehicle Management View
* *************************************** */
invCont.BuildManagementPage = async function (req, res, next) {
  let nav = await utilities.getNav()
  const classificationSelect = await utilities.buildClassificationList()
  res.render("./inventory/vehicle-management", {
    title: "Vehicle Management",
    nav,
    error: null,
    classificationSelect,
  })
};

/* ****************************************
*  Deliver New Classification
* *************************************** */
invCont.BuildNewClassifiation = async function (req, res, next) {
  let nav = await utilities.getNav()
  res.render("./inventory/add-classification", {
    title: "Add New Classifiation",
    nav,
  })
};
  
/* ****************************************
*  Deliver New Vehicle
* *************************************** */
invCont.BuildNewVehicle = async function (req, res, next) {
  let nav = await utilities.getNav()
  res.render("./inventory/add-inventory", {
    title: "Add New Vehicle",
    nav,
  })
};
  
/* ***************************
 *  Return Inventory by Classification As JSON
 * ************************** */
invCont.getInventoryJSON = async (req, res, next) => {
  const classification_id = parseInt(req.params.classification_id)
  const invData = await invModel.getInventoryByClassificationId(classification_id)
  if (invData[0].inv_id) {
    return res.json(invData)
  } else {
    next(new Error("No data returned"))
  }
}

module.exports = invCont;
