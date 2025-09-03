import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from "mongoose";
import router from './routes/authRoutes.js';
import passport from './config/passport.js';
import http from 'http';
import { Server } from 'socket.io';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*"
    }
});

app.use(cors());
app.use(express.json());
app.use(passport.initialize());

const PORT = process.env.PORT || 5000;

const connDB = async() => {
    const conn = await mongoose.connect(process.env.MONGO_URL);

    if(conn){
        console.log("MongoDB Connected");
    }else{
        console.log("MongoDB not Connected");
    }
}

app.get('/health', (req, res) => {
  res.send('SERVER IS HEALTHY');
});

io.on("connection", (socket) => {
    console.log(`New client connected: ${socket.id}`);
});

app.use('/auth', router)

connDB();
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
