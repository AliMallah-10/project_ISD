// This middleware checks if a user has specific authorization.
module.exports = function (requiredRole) {
  return function (req, res, next) {
    // Check if the user has the required role (e.g., by checking user roles in the database)
    if (req.user && req.user.role === requiredRole) {
      // If authorized, continue to the next middleware/route handler
      return next();
    }

    // If not authorized, send a 403 Forbidden response
    res.status(403).json({ error: "Forbidden" });
  };
};
