const uexpress = require("express");
const urouter = uexpress.Router();
// const uconfig = require("../config");
const uauth = require("../middleware/auth");
const uhasRole = require("../middleware/hasRole");
const { users } = require("./Users");
urouter.route("/").get([uauth], users);
module.exports = urouter;
//# sourceMappingURL=Route.js.map