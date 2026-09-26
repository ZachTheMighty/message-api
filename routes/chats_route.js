const route = require("express").Router();
const controller = require("../controllers/chats_controller.js");

route.get("/:chatId", controller.getChatById);
route.post("/", controller.createChat);

module.exports = route;
