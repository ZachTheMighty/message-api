const route = require("express").Router();
const controller = require("../controllers/sign_up_controller.js");

route.post("/", controller.createUser);

module.exports = route;
