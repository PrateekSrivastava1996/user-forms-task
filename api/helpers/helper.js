const auth = require("../settings/auth");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const CONFIG = require("../config.json");

const generateToken = (data) => {
     const userData = {
          _id: data._id,
     };
     const payload = {
          userData,
          iat: Math.floor(Date.now() / 1000) - 30,
          // exp: Math.floor(Date.now() / 1000) + 60 * 60 * 60 * 24,
     };
     try {
          const token = jwt.sign(payload, CONFIG.FRONTEND_JWT_SECRET);
          return token;
     } catch (err) {
          return false;
     }
};

const generateTokenForUSer = (data) => {
     const userData = {
          _id: data._id,
     };
     const payload = {
          userData,
          iat: Math.floor(Date.now() / 1000) - 30,
          // exp: Math.floor(Date.now() / 1000) + 60 * 60 * 60 * 24,
     };
     try {
          const token = jwt.sign(payload, CONFIG.FRONTEND_USER_JWT_SECRET);
          return token;
     } catch (err) {
          return false;
     }
};

const verifyJWT = (resetToken) => {
     try {
          const legit = jwt.verify(resetToken, CONFIG.FRONTEND_JWT_SECRET);
          return legit;
     } catch (err) {
          return false;
     }
};

const comparePassword = async (password, enteredPassword) => {
     const valid = await bcrypt.compare(password, enteredPassword);
     if (valid) {
          return true;
     }
     return false;
};

module.exports = {
     verifyJWT,
     generateToken,
     comparePassword,
     generateTokenForUSer,
};
