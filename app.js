require("dotenv").config();
const express = require("express");

const usersRoute = require("./routes/users_route.js");

const app = express();

app.use(express.json());

app.use("/users", usersRoute);

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
