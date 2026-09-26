const authenticateUser = require("../middlewares/authenticate.js");
const prisma = require("../lib/prisma.ts");

const createChat = [
  authenticateUser,
  async (req, res) => {
    const chat = await prisma.chat.create({
      data: {
        users: {
          connect: [{ id: req.payload.user.id }, { id: req.params.userId }],
        },
      },
    });
    res.json(chat);
  },
];

module.exports = { createChat };
