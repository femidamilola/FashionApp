const Mongoose = require("mongoose");
const uri = process.env.DB_URI;
const connectDB = async () => {
  await Mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("MongoDB Connected");
};
module.exports = connectDB;
