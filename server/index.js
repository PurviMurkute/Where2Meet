import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get('/health', (req, res) => {
  res.send('SERVER IS HEALTHY');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
