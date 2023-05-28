const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    validate(value) {
      if (!validator.isAlphanumeric(value)) {
        throw new Error(
          "Unable to SignUp! Username should contain only alphabets and numbers!"
        );
      }
    },
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Unable to SignUp! Invalid Email!");
      }
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
    validate(value) {
      if (!validator.isStrongPassword(value)) {
        throw new Error(
          "Unable to SignUp! Password must be a contain 8 charcters, lowercase, uppercase, special characters!"
        );
      }
    },
  },


  weatherNotifications: {
    type: Boolean,
    default: false,
  },


  location: {
    latitude: {
      type: String,
      required: true,
    },
    longitude: {
      type: String,
      required: true,
    },
  },

  tokens: [
    {
      /*Each token in an tokens array will be an object with a single field called token.*/
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

//--------------AUTHENTICATING USER-------------
userSchema.methods.genAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, "thisismynewideA", {
    expiresIn: "1 day",
  });

  user.tokens = user.tokens.concat({ token });
  await user.save(); //saves token in database

  return token;
};

//--------------Hashing Passwords-------------
userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    // console.log("Inside function pre save");
    user.password = await bcryptjs.hash(user.password, 8);
  }

  next(); //we call next() to inform that password hashing is done in order to perform next task which is to save the user information
});

//---------------Login Function---------------
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email: email });
  //If user doesn't exists (Checking existence of user)
  if (!user) {
    throw new Error("Unable to login! Check your email and password!");
  } else {
    const isMatch = await bcryptjs.compare(password, user.password);

    //If user exists but Password is invalid (Checking password validation)
    if (!isMatch) {
      throw new Error("Unable to login! Check your email and password!");
    } else {
      console.log("Login Successful!");
      return user;
    }
  }
};

//-------------reset password------------
userSchema.statics.resetData = async (dataToUpdate, user) => {
  const isMatch = await bcryptjs.compare(
    dataToUpdate.oldPassword,
    user.password
  );
  console.log(isMatch);
  if (isMatch) {
    if (dataToUpdate.username != "") user.username = dataToUpdate.username;
    if (dataToUpdate.newPassword != "") {
      user.password = dataToUpdate.newPassword;
      delete user.tokens;
    }
    await user.save();
    console.log("After wala user");
    console.log(user);
  }
  return isMatch;
};

//-------------Find user------------------
userSchema.statics.findUser = async (token) => {
  const decoded = jwt.verify(token, "thisismynewideA");


  const user = await User.findOne({
    _id: decoded._id,
    "tokens.token": token,
  });
  return user;
};



const User = mongoose.model("User", userSchema);
module.exports = User;
