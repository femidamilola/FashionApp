const express = require("express");
const router = express.Router();
const config = require("../config");
const auth = require("../middleware/auth");
const hasRole = require("../middleware/hasRole");
const { register, verify, login, resend, me, getToken } = require("./Auth");
router.route("/register").post(register);
router.route("/verify").post(verify);
router.route("/login").post(login);
router.route("/resend").post(resend);
router.route("/me").get([auth, hasRole(["Admin", "Basic"])], me);
router.route("/token").post(getToken);
module.exports = router;
//# sourceMappingURL=Route.js.map