const sw_express = require("express");
const sw_router = sw_express.Router();
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./docs");
sw_router.use("/api-docs", swaggerUi.serve);
sw_router.get("/api-docs", swaggerUi.setup(swaggerDocument));
module.exports = sw_router;
