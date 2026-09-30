const route = require("express").Router();
const controller = require("../controllers/sign_up_controller.js");
const authenticate = require("../middlewares/authenticate.js");

route.post("/", controller.createUser);
route.use(authenticate);
route.get("/", controller.getAllUsers);
route.post("/:userId", controller.updateUserById);

module.exports = route;
