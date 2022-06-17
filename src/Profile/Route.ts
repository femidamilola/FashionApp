const pexpress = require("express");
const prouter = pexpress.Router();
// const uconfig = require("../config");
const pauth = require("../middleware/auth");
const phasRole = require("../middleware/hasRole");
const { profile, create } = require("./Profile");
prouter.route("/").get([pauth], profile);
prouter.route("/create").post([pauth], create);

module.exports = prouter;
