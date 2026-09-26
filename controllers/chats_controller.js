const prisma = require("../lib/prisma.ts");

const getChatById = async (req, res) => {
  const chat = await prisma.chat.findMany({
    where: { id: +req.params.chatId },
    include: { users: true, messages: true },
  });
  res.json(chat);
};

const createChat = async (req, res) => {
  const chat = await prisma.chat.create({
    data: {
      users: {
        connect: [{ id: req.payload.user.id }, { id: +req.params.userId }],
      },
    },
  });
  res.json(chat);
};

const createMessage = async (req, res) => {
  if (
    !(await prisma.chat.findUnique({
      where: { id: +req.params.chatId },
    }))
  )
    return res
      .status(404)
      .json({ errors: "Can't create message under non existent chat." });

  const message = await prisma.message.create({
    data: {
      userId: +req.body.userId,
      chatId: +req.params.chatId,
      content: req.body.content,
    },
  });
  res.json(message);
};

module.exports = { createChat, getChatById, createMessage };
