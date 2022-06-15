exports.users = async (req, res, next) => {
  const user = require("../model/User");
  const role = req.query.role ? req.query.role : "";
  try {
    await user
      .find(
        role
          ? {
              role,
            }
          : {}
      )
      .select("-password")
      .then(async (users) => {
        return res.status(200).json({
          data: users,
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
