import express from "express";
require("dotenv").config();
const connectDB = require("./db/db");
const bodyParser = require("body-parser");

const app = express();
app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const port = process.env.PORT || 3000;

connectDB();
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/auth", require("./Auth/Route"));

const server = app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
// Handling Error
process.on("unhandledRejection", (err: any) => {
  console.log(`An error occurred: ${err.message}`);
  server.close(() => process.exit(1));
});
