import express from 'express';
import cors from 'cors';
import booksRouter from './src/routes/books';
import favoritesRouter from './src/routes/favorites';
import { PORT } from './src/config';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/books', booksRouter);
app.use('/api/favorites', favoritesRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
