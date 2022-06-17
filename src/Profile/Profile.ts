exports.profile = async (req, res, next) => {
  const profile = require("../model/Profile");
  if (!req.query.user)
    return res.status(400).json({
      message: "No user ID provided",
    });
  const user = req.query.user;
  try {
    await profile
      .findOne({ user })
      .then(async (profile) => {
        return res.status(200).json({
          profile,
        });
      })
      .catch((err) => {
        throw err;
      });
  } catch (err) {
    res.status(400).json({
      message: "An error occurred",
      error: err.message,
    });
  }
};

exports.create = async (req, res, next) => {
  const profile = require("../model/Profile");
  const { user, fullName, phone } = req.body;
  const existing = await profile.findOne({ user });
  if (existing)
    return res.status(400).json({
      message: "Profile already exists for this user",
    });
  try {
    await profile
      .create({
        user,
        fullName,
        phone,
      })
      .then((data) => {
        res.status(200).json({
          message: "Profile created successfully",
          data,
        });
      })
      .catch((err) => {
        throw err;
      });
  } catch (error) {
    res.status(400).json({
      message: "An error occurred",
      error: error,
    });
  }
};
