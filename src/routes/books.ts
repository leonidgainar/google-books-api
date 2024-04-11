import express from 'express';
import { fetchBooks } from '../controllers/booksController';
import { validateSearchText } from '../middlewares/validate';

const router = express.Router();

router.get('/', validateSearchText, fetchBooks);

export default router;
