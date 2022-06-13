module.exports = (roles: string[]) => {
  return (req, res, next) => {
    if (!req.user.role || !roles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Access Denied",
        error: "You do not have access to this resource",
      });
    }

    next();
  };
};
