// const getTodos = require('./get-todos');
const swaggerlogin = require("./login");
const swaggerregister = require("./register");
const swaggertoken = require("./token");
const swaggertest = require("./test");
const swaggerresend = require("./resend");
const swaggerusers = require("./users");

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
    "/auth/verify": {
      ...require("./verify"),
    },
    "/auth/me": {
      ...swaggertest,
    },
    "/auth/resend": {
      ...swaggerresend,
    },
    "/users": {
      ...swaggerusers,
    },
    // "/profile": {
    //   ...require("./profile"),
    // },
    // "/profile/create": {
    //   ...require("./newprofile"),
    // },
  },
};
