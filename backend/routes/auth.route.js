require('dotenv').config();
const router = require("express").Router();
const User = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const checkToken = require("../config/config");

const TOKEN_SECRET = process.env.TOKEN_SECRET;

router.post("/signup", async (req, res) => {
    let { username, email, password } = req.body;
    try {
      let user = new User({ username, email });
  
      //hash password before save
      let hashPassword = await bcrypt.hash(password, 10);
      user.password = hashPassword;
  
      //save user
      await user.save();
      const payload = {
        user: {
          id: user._id,
        },
      };
      //token on login
      jwt.sign(
        payload,
        TOKEN_SECRET,
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err; //if error go to catch
          res
            .status(200)
            .json({ token, message: "user signup successful!" });
        }
      );
    } catch (error) {
      //   500 internal server error
      res
        .status(500)
        .json({ message: "user signup is not successful!" });
    }
  });

  router.post("/login", async (req, res) => {
    let { username, password } = req.body;
    try {
      //search db for user with email
      let user = await User.findOne({ username });
  
      if (!user) {
        return res.status(400).json({ message: "user not found!" });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (!isMatch) {
        return res.status(400).json({ message: "wrong password" });
      }
  
      //user mongo ID payload
      const payload = {
        user: {
          id: user._id,
        },
        email: {
          email: user.email
        }
      };
  
      jwt.sign(
        payload,
        TOKEN_SECRET,
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err; 
  
          res.status(200).json({ token, payload });
        }
      );
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error 500" });
    }
  });

  router.get("/user", checkToken, async (req, res) => {
    try {
      let user = await User.findById(req.user.id, "-password");
  
      res.status(200).json({
        user,
      });
    } catch (error) {
      res.status(500).json({
        message: "check user get",
      });
    }
  });

  module.exports = router;