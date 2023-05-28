const jwt = require("jsonwebtoken");
const User = require("../schema/userSchema");

const auth = async (req, res, next) => {
  try {

    const token = req.cookies["x-access-token"]; // fetching token value

    if (token) {

      const decoded = jwt.verify(token, "thisismynewideA");


      const user = await User.findOne({
        _id: decoded._id,
        "tokens.token": token,
      });

      //-------Used for logout function-----------
      req.token = token; // current token
      req.user = user; // current user
      console.log(user);
      //-----------------
      if (!user) {
        throw new Error("Authentication failed!");
      }
      next();
    } else {
      throw new Error("Authentication failed! Please login again.");
    }
  } catch (e) {
    console.log(e);
    let err = e.toString().replace("Error: ", "");

  }
};

module.exports = auth;
