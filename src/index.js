const express = require("express");
require("./db/mongoose");
const app = express();
const port = process.env.PORT || 3000;
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");
const auth = require("./middleware/auth");

// app.use((req, res, next) => {
//   res.status(503).send("Maintainance is going on, please bare with us 🙏");
// });

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
