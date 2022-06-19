const jwt = require("jsonwebtoken");
const User = require("../models/user");

const auth = async (req, res, next) => {
  console.log("Running auth function");
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    console.log(token);
    const decoded = jwt.verify(token, "thalaiva");

    const user = await User.findOne({ _id: decoded._id, "token.token": token });
    console.log(user);

    if (!user) {
      throw new Error("");
    }
    req.user = user;
    next();
  } catch (e) {
    res.status(401).send(e);
  }
  next();
};

module.exports = auth;
