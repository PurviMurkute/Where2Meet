import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import router from "./routes/authRoutes.js";
import passport from "./config/passport.js";
import http from "http";
import { Server } from "socket.io";
import groupRouter from "./routes/groupRoutes.js";
import Group from "./models/Group.js";
import User from "./models/User.js";
import placesRoutes from "./routes/placesRoutes.js";

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.use(cors());
app.use(express.json());
app.use(passport.initialize());

const PORT = process.env.PORT || 5000;

const connDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URL);

  if (conn) {
    console.log("MongoDB Connected");
  } else {
    console.log("MongoDB not Connected");
  }
};

app.get("/health", (req, res) => {
  res.send("SERVER IS HEALTHY");
});

io.on("connection", (socket) => {
  console.log(`New client connected: ${socket.id}`);

  socket.on("joinGroup", async ({ groupCode, userId }) => {
    socket.join(groupCode);
    socket.groupCode = groupCode;
    socket.userId = userId;
    console.log(`User ${userId} joined group ${groupCode}`);

    // Emit to room that user joined
    io.to(groupCode).emit("userJoined", { userId });

    // Immediately send current locations in the group to everyone in room
    try {
      const group = await Group.findOne({ code: groupCode }).populate(
        "members.userId",
        "username location"
      );
      const locations = (group?.members || [])
        .map((m) => ({
          userId: m.userId._id,
          username: m.userId.username,
          location: m.userId.location,
        }))
        .filter(
          (x) => x.location && x.location.latitude && x.location.longitude
        );

      io.to(groupCode).emit("groupLocations", locations);
    } catch (err) {
      console.error("joinGroup error:", err);
    }
  });

  socket.on("shareLocation", async ({ groupCode, userId, location }) => {
    try {
      await User.findByIdAndUpdate(userId, {
        location,
        lastUpdated: new Date(),
        isLocationSharing: true,
      });

      const group = await Group.findOne({ code: groupCode }).populate(
        "members.userId",
        "username location"
      );
      const locations = (group?.members || [])
        .map((m) => ({
          userId: m.userId._id,
          username: m.userId.username,
          location: m.userId.location,
        }))
        .filter(
          (x) => x.location && x.location.latitude && x.location.longitude
        );

      io.to(groupCode).emit("groupLocations", locations);
    } catch (err) {
      console.error("shareLocation error:", err);
    }
  });

  socket.on("disconnect", () => {
    console.log(`Socket disconnected: ${socket.id}`);
    if (socket.groupCode && socket.userId) {
      io.to(socket.groupCode).emit("userLeft", { userId: socket.userId });
    }
  });
});

app.use("/api", router);
app.use("/api", groupRouter);
app.use('/api', placesRoutes);

connDB();
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
