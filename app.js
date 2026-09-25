require("dotenv").config();
const express = require("express");

const app = express();

app.get("/", (req, res) =>
  req.json({
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
