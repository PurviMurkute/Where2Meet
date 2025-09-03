import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from "mongoose";
import router from './routes/authRoutes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

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

app.use('/auth', router)

connDB();
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
