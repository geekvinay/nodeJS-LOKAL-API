const { Mongoose } = require("mongoose");
const Task = require("../src/models/task");
const User = require("../src/models/user");

Task.findByIdAndDelete("62a9d8e1742d2cace4dfaec3")
  .then((task) => {
    console.log(task);
    return Task.countDocuments({ completed: false });
  })
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });
