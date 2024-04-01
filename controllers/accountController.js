const bcrypt = require("bcryptjs")
const utilities = require("../utilities");
const accountModel = require("../models/account-model");


/* ****************************************
*  Deliver login view
* *************************************** */
async function buildLogin(req, res, next) {
   let nav = await utilities.getNav()
   res.render("account/login", {
      title: "Login",
      nav,
   })
}

/* ****************************************
*  Deliver registration view
* *************************************** */
async function buildRegister(req, res, next) {
   let nav = await utilities.getNav()
   res.render("account/register", {
      title: "Register",
      nav,
      errors: null,
   })
}

/* ****************************************
*  Deliver registration view
* *************************************** */
async function buildAccountManagement(req, res, next) {
   let nav = await utilities.getNav()
   res.render("account/account-management", {
      title: "Account Management",
      nav,
      errors:null,
   })
};

/* ****************************************
*  Process Registration
* *************************************** */
async function registerAccount(req, res) {
   let nav = await utilities.getNav()
   const { account_firstname, account_lastname, account_email, account_password } = req.body

   // Hash the password before storing
  let hashedPassword
  try {
    // regular password and cost (salt is generated automatically)
     hashedPassword = await bcrypt.hashSync(account_password, 10)
  } catch (error) {
    req.flash("notice", 'Sorry, there was an error processing the registration.')
    res.status(500).render("account/register", {
      title: "Registration",
      nav,
      errors: null,
    })
  }

   const regResult = await accountModel.registerAccount(
      account_firstname,
      account_lastname,
      account_email,
      hashedPassword
      )
      
      if (regResult) {
         req.flash(
            "notice",
            `Congratulations, you\'re registered ${account_firstname}. Please log in.`
            )
            res.status(201).render("account/login", {
               title: "Login",
               nav,
            })
         } else {
            req.flash("notice", "Sorry, the registration failed.")
            res.status(501).render("account/register", {
               title: "Registration",
               nav,
            })
         }
      }

      /* ****************************************
 *  Process login request
 * ************************************ */
      async function accountLogin(req, res) {
         const { account_email, account_password } = req.body;
         
         try {
            const accountData = await accountModel.getAccountByEmail(account_email);
            
            if (!accountData) {
               req.flash("notice", "Please check your credentials and try again.");
               return res.status(400).render("account/login", {
                  title: "Login",
                  nav: await utilities.getNav(),
                  errors: null,
                  account_email,
               });
            }
            
            const passwordMatch = await bcrypt.compare(account_password, accountData.account_password);
            
            if (passwordMatch) {
               delete accountData.account_password;
               const accessToken = jwt.sign(accountData, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 3600 });
               res.cookie("jwt", accessToken, { httpOnly: true, secure: process.env.NODE_ENV === 'production', maxAge: 3600 * 1000 });
               return res.redirect("/inv/");
            } else {
               req.flash("notice", "Please check your credentials and try again.");
               return res.status(400).render("account/login", {
                  title: "Login",
                  nav: await utilities.getNav(),
                  errors: null,
                  account_email,
               });
            }
         } catch (error) {
            console.error("Error in account login:", error);
            return res.status(500).render("error", { message: "Internal Server Error" });
         }
      }

module.exports = { buildLogin, buildRegister, registerAccount, accountLogin, buildAccountManagement }

// Nathan@katambuka2020 !password