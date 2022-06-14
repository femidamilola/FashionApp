// const getTodos = require('./get-todos');
const swaggerlogin = require("./login");
const swaggerregister = require("./register");
// const getTodo = require('./get-todo');
// const createTodo = require('./create-todo');
// const updateTodo = require('./update-todo');
// const deleteTodo = require('./delete-todo');
module.exports = {
    paths: {
        "/auth/login": Object.assign({}, swaggerlogin),
        "/auth/register": Object.assign({}, swaggerregister),
    },
};
//# sourceMappingURL=index.js.map