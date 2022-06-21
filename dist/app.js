"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv").config();
const connectDB = require("./db/db");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));
app.use(cors());
const port = process.env.PORT || 3000;
connectDB();
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.use("/api/auth", require("./Auth/Route"));
app.use("/api/users", require("./User/Route"));
// app.use("/api/profile", require("./Profile/Route"));
app.use("/api/swagger", require("./Swagger/Route"));
const server = app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
// Handling Error
process.on("unhandledRejection", (err) => {
    console.log(`An error occurred: ${err.message}`);
    server.close(() => process.exit(1));
});
//# sourceMappingURL=app.js.map