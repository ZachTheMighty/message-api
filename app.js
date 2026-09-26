require("dotenv").config();
const express = require("express");

const usersRoute = require("./routes/users_route.js");
const logInRoute = require("./routes/log_in_route.js");
const chatsRoute = require("./routes/chats_route.js");
const authenticate = require("./middlewares/authenticate.js");

const app = express();

app.use(express.json());

app.use("/users", usersRoute);
app.use("/tokens", logInRoute);
app.use(authenticate);
app.use("/chats", chatsRoute);

app.get("/", (req, res) =>
  res.json({
    name: "Message API",
    version: "1.0.0",
    description: "API for a messaging web app",
  }),
);

const port = process.env.PORT;

app.listen(port, (error) => {
  if (error) throw error;
  console.log(port);
});
