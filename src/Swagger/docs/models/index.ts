module.exports = {
  paths: {
    "/auth/login": {
      ...require("./login"),
    },
    "/auth/register": {
      ...require("./register"),
    },
    "/auth/token": {
      ...require("./token"),
    },
    "/auth/verify": {
      ...require("./verify"),
    },
    "/auth/me": {
      ...require("./test"),
    },
    "/auth/resend": {
      ...require("./resend"),
    },
    "/users": {
      ...require("./users"),
    },
    // "/profile": {
    //   ...require("./profile"),
    // },
    // "/profile/create": {
    //   ...require("./newprofile"),
    // },
  },
};
