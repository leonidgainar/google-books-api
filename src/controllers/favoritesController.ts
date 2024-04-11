import { Request, Response } from 'express';
import { connectDatabase } from '../middlewares/database';

async function getFavorites(req: Request, res: Response) {
  const db = await connectDatabase();
  
  try {
    const books = await db.all('SELECT * FROM books');
    res.json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch favorite books' });
  } finally {
    await db.close();
  }
}

async function addFavorite(req: Request, res: Response) {
  const { id, title, thumbnail, subtitle, searchInfo } = req.body;
  const db = await connectDatabase();

  try {
    const result = await db.run(`
            INSERT INTO books (id, title, thumbnail, subtitle, searchInfo)
            VALUES (?, ?, ?, ?, ?)
        `, [id, title, thumbnail, subtitle, searchInfo]);

    res.status(201).json({ message: 'Book added successfully', bookId: result.lastID });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to add book to favorites' });
  } finally {
    await db.close();
  }
}

async function deleteFavorite(req: Request, res: Response) {
  const { id } = req.params;
  const db = await connectDatabase();

  try {
    await db.run(`DELETE FROM books WHERE id = ?`, id);
    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete book from favorites' });
  } finally {
    await db.close();
  }
}

export { getFavorites, addFavorite, deleteFavorite };
