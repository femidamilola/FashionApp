const am_jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token)
    return res.status(401).json({
      message: "Access Denied. No token provided",
    });

  try {
    am_jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(411).json({
          error: true,
          message: "Unauthorized access.",
          err: err,
        });
      }
      req.user = decoded;
      next();
    });
    // const date = new Date(Date.now());
    // const iat = new Date(Number(decoded.iat) * 1000);
    // console.log(date.getTime());
    // console.log(iat.getTime());
    // if (Number(decoded.iat) < 0) throw "Token date impossible";
    // if (!decoded)
    //   return res.status(400).json({
    //     message: "Token expired. Please log in again",
    //   });
    // req.user = decoded;
    // next();
  } catch (error) {
    res.status(400).json({
      message: "Invalid token",
      error: error,
    });
  }
};
