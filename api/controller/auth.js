const authService = require("../services/auth.services");
const _ = require("lodash");
const {
  generateToken,
  comparePassword,
} = require("../helpers/helper");
const bcrypt = require("bcrypt");

const signup = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const user = await authService.findOne({ userName });
    if (user) {
      return res.status(400).json({
        message: "Please try different userName, Already Exists",
      });
    }

    bcrypt.hash(password.toString(), 10, async (err, hash) => {
      try {
        if (err) {
          return res.status(400).json({
            error: "Something went wrong",
          });
        }
        const newUser = {
          ...req.body,
          password: hash,
        };
        const createdUser = await authService.post(newUser);
        return res.status(200).json({
          success: true,
          message: "Registered successfully",
          data: createdUser,
        });
      } catch (error) {
        return res.status(400).json({
          message: error.message,
          data: {},
          success: false,
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      data: {},
      success: false,
    });
  }
};

const signin = async (req, res) => {
  try {
    const { userName } = req.body;
    const user = await authService.findOne({ userName });
    if (user) {
      const validUser = await comparePassword(req.body.password, user.password);
      if (!validUser) {
        return res.status(203).json({
          message: "Invalid username/password",
        });
      }
      const token = await generateToken(user);
      if (!token) {
        return res.status(206).json({
          message: "Error in generating token",
        });
      }
      res.status(200).json({
        message: "Logged In",
        data: {
          user: user,
          token: token,
        },
      });
    } else {
      res.status(206).json({
        message: "Invalid username/password",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
      data: {},
      success: false,
    });
  }
};

const getUser = async (req, res) => {
  try {
    const condition = {
      _id: req.params.id,
    };
    let result = await authService.findOne(condition);
    if (!result) {
      return res.status(200).send({
        message: "User is not exists",
      });
    } else {
      return res.status(200).json({
        message: " Successfull",
        data: result,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error,
    });
  }
};

module.exports = {
  signin,
  signup,
  getUser,
};