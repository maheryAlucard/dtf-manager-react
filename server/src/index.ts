import express from 'express';
import cors from 'cors';
import authRouter from './routes/auth.js';
import servicesRouter from './routes/services.js'; // Import services router

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/services', servicesRouter); // Use services router

app.get('/', (req, res) => {
  res.send('Server is running!');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});