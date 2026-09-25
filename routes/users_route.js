const route = require("express").Router();
const controller = require("../controllers/users_controller.js");

route.post("/", controller.createUser);

module.exports = route;
