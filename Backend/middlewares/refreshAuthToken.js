const jwt = require("jsonwebtoken");

// Middleware to refresh the token and handle automatic logout
const refreshAuthToken = async (req, res, next) => {
  const token = req.headers.authorization;

  // Check if the token is valid
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Refresh the token every 3 minutes
    const now = Date.now() / 1000;
    if (decoded.exp - now < 180) {
      const newToken = jwt.sign({ id: decoded.id }, process.env.JWT_SECRET, {
        expiresIn: "3 minutes",
      });
      res.setHeader("Authorization", newToken);
    }

    // Handle automatic logout after 10 minutes of inactivity
    if (now - decoded.iat > 600) {
      // Log the user out (e.g., clear the user's session)
      req.session.destroy((err) => {
        if (err) {
          console.error("Error destroying session:", err);
        }
      });
      return res.status(401).json({ message: "Session expired" });
    }
  } catch (error) {
    // Token is invalid or has already expired
    console.error(error);
  }
  next();
};

module.exports = refreshAuthToken;
