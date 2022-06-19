const mongoose = require("mongoose");
const Task = require("../src/models/task");
// const User = require("../src/models/user");

// const updateAgeandCount = async (id, age) => {
//   const user = await User.findByIdAndUpdate(id, { age });
//   console.log(user);
//   const count = await User.countDocuments({ age });
//   return count;
// };

// updateAgeandCount("62aacbbfb0daa7eaffaed7dd", 20)
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((e) => console.log(e));

const deleteTaskAndCount = async (id) => {
  const task = await Task.findByIdAndDelete(id);
  const count = await Task.countDocuments({ completed: false });
  return count;
};

deleteTaskAndCount("62aafe61c9ef2f5cd5308832")
  .then((count) => {
    console.log(count);
  })
  .catch((e) => {
    console.log(e);
  });
