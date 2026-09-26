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
module.exports = { createChat, getChatById };
