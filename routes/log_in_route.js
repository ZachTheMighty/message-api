const route = require("express").Router();
const controller = require("../controllers/log_in_controller.js");

route.post("/", controller.createToken);

module.exports = route;
