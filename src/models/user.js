const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const { JsonWebTokenError } = require("jsonwebtoken");
const jwt = require("jsonwebtoken");

mongoose.connect("mongodb://localhost:27017/task-manager-api", {
  useNewUrlParser: true,
});

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "Anonymous",
  },
  age: {
    type: Number,
    validate(value) {
      if (value < 0) {
        throw new Error("Age must be postive");
      }
    },
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 7,
    validate(value) {
      if (value.toLowerCase().includes("password")) {
        throw new Error("Password cannot contain password");
      }
    },
  },
});

// Hash the plain text password before saving
userSchema.pre("save", async function (next) {
  const user = this;
  const password = user.password;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(password, 8);
  }

  console.log("User pre save");
  next();
});

userSchema.methods.generateAuthToken = async function () {
  let user = this;
  const token = jwt.sign({ _id: user._id.toString() }, "thalaiva");

  user.tokens = user.tokens.concat({ token });

  user.save();
  return token;
};

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Unable to log in");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw new Error("Unable to login");
  }

  return user;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
