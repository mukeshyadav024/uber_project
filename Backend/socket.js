const socketIo = require("socket.io");
const userModel = require("./models/user.model");
const captainModel = require("./models/captain.model");
let io;

function initializeSocket(server) {
  io = socketIo(server, {
    cors: {
      origin: "*", // Adjust as needed for security
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`Client connected: ${socket.id}`);

  

    socket.on("join", async (data) => {
      const { userId, userType } = data;

    //   console.log(`user ${userId} joined as ${userType}`);

      if (userType === "user") {
        await userModel.findByIdAndUpdate(userId, { socketID: socket.id });
      } else if (userType === "captain") {
        await captainModel.findByIdAndUpdate(userId, { socketID: socket.id });
      }
    });


    socket.on('update-location-captain', async (data) => {
        const { userId, location } = data;
        // console.log(`user ${userId} updated location to ${location}`);

        if (!location || !location.lng || !location.ltd) {
            return socket.emit("error", {message:"Invalid location data"});
        }
       
            await captainModel.findByIdAndUpdate(userId, { location:{
                lng: location.lng,
                ltd: location.ltd,
            } });
            
    })



    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });
}

function sendMessageToSocketId(socketId, messageObj) {
    console.log(messageObj.event, messageObj.data);
    
  if (io) {
    io.to(socketId).emit(messageObj.event, messageObj.data);
  } else {
    console.error("Socket.io not initialized");
  }
}

module.exports = {
  initializeSocket,
  sendMessageToSocketId,
};
