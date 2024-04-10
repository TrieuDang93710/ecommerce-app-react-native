"use strict";
const userController = require("../controller/userController");

const express = require("express");
const router = express.Router();

module.exports = router.post("/register", userController.register);
module.exports = router.post("/login", userController.login);

// "use strict";
// module.exports = (app) => {
//   let userCtrl = require("../controller/userController");
//   app.route("/register").post(userCtrl.register);
//   app.route("/login").post(userCtrl.login);
// };
