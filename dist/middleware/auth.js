const am_jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token)
        return res.status(401).json({
            message: "Full Authentication is required",
            error: "Access Denied. No token provided",
        });
    try {
        am_jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(411).json({
                    error: true,
                    message: "Full Authentication is required",
                    err: err,
                });
            }
            req.user = decoded;
            next();
        });
    }
    catch (error) {
        res.status(400).json({
            message: "Full Authentication is required",
            error: error,
        });
    }
};
//# sourceMappingURL=auth.js.map