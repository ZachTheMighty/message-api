const prisma = require("../lib/prisma.ts");
const validateMessage = require("../middlewares/validate_message.js");

const getAllChats = async (req, res) => {
  const chats = await prisma.chat.findMany({
    include: { users: true, messages: true },
  });
  res.json(chats);
};

const getChatById = async (req, res) => {
  const chat = await prisma.chat.findUnique({
    where: { id: +req.params.chatId },
    include: { users: true, messages: true },
  });
  res.json(chat);
};

const createChat = async (req, res, next) => {
  const chatExists = await prisma.chat.findUnique({
    where: {
      id: +req.params.chatId,
    },
    include: { users: true, messages: true },
  });

  if (chatExists) return next();

  await prisma.chat.create({
    data: {
      users: {
        connect: [{ id: req.payload.user.id }, { id: req.body.userId }],
      },
    },
    include: { users: true, messages: true },
  });
  next();
};

const createMessage = [
  createChat,
  validateMessage,
  async (req, res) => {
    if (
      !(await prisma.chat.findUnique({
        where: { id: +req.params.chatId },
      }))
    )
      return res
        .status(404)
        .json({ errors: "Can't create message under non existent chat." });

    await prisma.message.create({
      data: {
        user: { connect: { id: req.payload.user.id } },
        chat: { connect: { id: +req.params.chatId } },
        content: req.body.content,
      },
    });
    res.json(
      await prisma.chat.findUnique({
        where: { id: +req.params.chatId },
        include: { users: true, messages: true },
      }),
    );
  },
];

const deleteMessageById = async (req, res) => {
  const message = await prisma.message.findUnique({
    where: { id: +req.params.messageId },
  });
  if (!message)
    return res.json({ errors: "Can't delete non existent message" });
  res.json(
    await prisma.message.delete({ where: { id: +req.params.messageId } }),
  );
};

module.exports = {
  createChat,
  getChatById,
  createMessage,
  getAllChats,
  deleteMessageById,
};
