const io = require("socket.io")(8900, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  //when connect
  console.log("a user connected.");
  //take userId and socketId from user
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    // io.emit("getUsers", users);
  });
  socket.on("joinRoom", (roomName) => {
    socket.join(roomName);
  })
  console.log("users", users);
  //send and get message
  socket.on("sendMessage", ({ senderId, to, text, isGroup }) => {
    if (isGroup) {
      io.to(to).emit("getMessageGroup", {
        senderId,
        text,
      });
    }
    else {
      const user = getUser(to);
      io.to(user.socketId).emit("getMessage", {
        senderId,
        text,
      });
    }
  });

  // socket.on('join-conversations', (conversationIds) => {
  //   conversationIds.forEach((id) => socket.join(id));
  // });

  // socket.on('join-conversation', (conversationId) => {
  //   socket.join(conversationId);
  // });

  // socket.on('leave-conversation', (conversationId) => {
  //   socket.leave(conversationId);
  // });


  // socket.on("typingMessenger", ({ senderId, receiverId, text }) => {
  //   const userTyping = getUser(receiverId);
  //   io.to(userTyping.socketId).emit("getTyping", {
  //     senderId,
  //     text,
  //   });
  // });

  //when disconnect
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", users);
    console.log(users);
  });
});