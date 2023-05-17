const jwt = require("jsonwebtoken");
const CONFIG = require("../config.json");

exports.authMiddleware = async (req, res, next) => {
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer") ||
    !req.headers.authorization.split(" ")[1]
  ) {
    return res.status(401).json({
      success: false,
      message: "Please provide the token",
    });
  }
  const accessToken = req.headers.authorization.split(" ")[1];
  try {
    const decoded = jwt.verify(accessToken, CONFIG.FRONTEND_JWT_SECRET);
    let userId = decoded.userData._id;
    req._user = userId;
    return next();
  } catch (error) {
    return res.status(200).json({ success: false, message: error.message });
  }
};
