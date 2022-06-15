// const getTodos = require('./get-todos');
const swaggerlogin = require("./login");
const swaggerregister = require("./register");
const swaggertoken = require("./token");
const swaggertest = require("./test");
const swaggerresend = require("./resend");

module.exports = {
  paths: {
    "/auth/login": {
      ...swaggerlogin,
    },
    "/auth/register": {
      ...swaggerregister,
    },
    "/auth/token": {
      ...swaggertoken,
    },
    "/auth/me": {
      ...swaggertest,
    },
    "/auth/resend": {
      ...swaggerresend,
    },
  },
};
