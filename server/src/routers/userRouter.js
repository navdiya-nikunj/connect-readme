const express = require("express");
const bodyParser = require("body-parser");
const { Novu } = require("@novu/node");
const path = require("path");
const User = require("../schema/userSchema");
const auth = require("../middleware/auth");
const router = new express.Router();
const novu = new Novu('f2950021f778562c5f24f02ce8b5ecfa');

const urlencodedParser = bodyParser.urlencoded({ extended: false });

router.post("/signup", urlencodedParser, async (req, res) => {
  const userData = req.body;

  console.log(userData);
  console.log("Location: ", req.body.location);

  const user = new User({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    weatherNotifications: req.body.weatherNotifications,
    location: req.body.location,
  });

  try {
    
    const token = await user.genAuthToken();
    console.log("token-->", token);
    
    res.cookie("x-access-token", token, {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
    });
    
    await user.save();
    console.log(user._id.toString());
    await novu.subscribers.identify(user._id.toString(), {
      email: user.email,
      firstName: user.username,
    });
    console.log("Data saved successfully");
    res.status(200).send(true);
  } catch (error) {
    if (error.code == 11000) {
      res.status(400).send("Alredy existed account on this email");
    } else {
      let err = error.toString().replace("ValidationError: ", "");
      err = err.replace("Error: ", "");
      res.status(400).send(err);
    }
  }
});

router.post("/login", urlencodedParser, async (req, res) => {
  try {
    console.log("request body");
    console.log(req.body);
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );

    const token = await user.genAuthToken();
    console.log(token);

    res.cookie("x-access-token", token, {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
    });

    console.log("user" + user);
    console.log("Login......");
    res.status(200).send("Successfully Logged in");
  } catch (e) {
    const err = e.toString().replace("Error: ", "");
    res.status(404).send("Invalid Email or Password");
  }
});

router.post("/profile", auth, async (req, res) => {
  try {
    const states = req.body;
    const user = await User.findUser(req.cookies["x-access-token"]);
    if (states.weatherReportEnabled != user.weatherNotifications) {
      user.weatherNotifications = states.weatherReportEnabled;
    }
    await user.save();
    res.status(200);
  } catch (e) {
    console.log(e);
    const err = e.toString().replace("Error: ", "");
    res.status(404).send(err);
  }
});

router.post("/updateProfile", auth, async (req, res) => {
  console.log("body");
  console.log(req.body);
  try {
    const dataToUpdate = req.body;
    const user = await User.findUser(req.cookies["x-access-token"]);
    console.log(user);

    const isMatch = await User.resetData(dataToUpdate, user);
    console.log(isMatch);
    if (isMatch) {
      await novu.subscribers.update('111', {
        email: user.email,
        
      });
      res.status(200).send("Data updated succesfully.");
    } else {
      res.status(404).send("Invalid Currunt Passuword");
    }
  } catch (e) {
    console.log(e);
    const err = e.toString().replace("Error: ", "");
    res.status(404).send(err);
  }
});

router.get("/savedProfile", auth, async (req, res) => {
  try {
    const user = await User.findUser(req.cookies["x-access-token"]);

    res.status(200).send(user);
  } catch (e) {
    console.log(e);
    const err = e.toString().replace("Error: ", "");
    res.status(404).send(err);
  }
});

router.get("/userExistence", auth, async (req, res) => {
  try {

    const user = await User.findUser(req.cookies["x-access-token"]);
    res.status(200).send(true);
  } catch (e) {
    console.log(e);
    const err = e.toString().replace("Error: ", "");
    res.send(400).send(false);
  }
});


router.post("/updateLocation", auth, async (req, res) => {
  try {
    const locationToUpdate = req.body;
    const user = await User.findUser(req.cookies["x-access-token"]);
    user.location.latitude = locationToUpdate.latitude;
    user.location.longitude = locationToUpdate.longitude;
    res.status(200).send("Location Updated");
    console.log(user);
  } catch (e) {
    console.log(e);
    const err = e.toString().replace("Error: ", "");
    res.status(400).send("Something went wrong");
  }
});

router.get("/logout", auth, async (req, res) => {
  try {
    console.log(req.user);

    req.user.tokens = req.user.tokens.filter((tokenElement) => {
      return tokenElement.token != req.token;
    });

    res.clearCookie("x-access-token");

    await req.user.save();

    console.log("Logout successfully...");
    // res.render("login"); // Render login page
    res.status(200).send("You've been loggged out!");
  } catch (error) {
    res.status(401).send("Authentication required!");
  }
});

module.exports = router;
