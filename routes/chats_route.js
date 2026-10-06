const route = require("express").Router();
const controller = require("../controllers/chats_controller.js");
const authenticate = require("../middlewares/authenticate.js");

route.use(authenticate);
route.get("/", controller.getAllChats);
route.get("/:chatId", controller.getChatById);
route.post("/", controller.createChat);
route.post("/:chatId/messages", controller.createMessage);

module.exports = route;
