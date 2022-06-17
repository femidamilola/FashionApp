// const getTodos = require('./get-todos');
const swaggerlogin = require("./login");
const swaggerregister = require("./register");
const swaggertoken = require("./token");
const swaggertest = require("./test");
const swaggerresend = require("./resend");
const swaggerusers = require("./users");
module.exports = {
    paths: {
        "/auth/login": Object.assign({}, swaggerlogin),
        "/auth/register": Object.assign({}, swaggerregister),
        "/auth/token": Object.assign({}, swaggertoken),
        "/auth/verify": Object.assign({}, require("./verify")),
        "/auth/me": Object.assign({}, swaggertest),
        "/auth/resend": Object.assign({}, swaggerresend),
        "/users": Object.assign({}, swaggerusers),
        "/profile": Object.assign({}, require("./profile")),
        "/profile/create": Object.assign({}, require("./newprofile")),
    },
};
//# sourceMappingURL=index.js.map