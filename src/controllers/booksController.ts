import axios from 'axios';
import { Request, Response } from 'express';
import { GOOGLE_API_URL } from '../config';

async function fetchBooks(req: Request, res: Response) {
  const searchText = req.query.q;
  try {
    const books = await fetchBooksFromAPI(searchText);
    const modifiedBooks = books.map((item) => ({
      id: item.id,
      title: item.volumeInfo.title,
      thumbnail: item.volumeInfo.imageLinks?.thumbnail,
      subtitle: item.volumeInfo.subtitle || undefined,
      searchInfo: item.searchInfo?.textSnippet || undefined
    }));
    res.json(modifiedBooks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch books' });
  }
}

// Fetch books from Google Books API
async function fetchBooksFromAPI(searchText) {
  try {
    const { data } = await axios.get(`${GOOGLE_API_URL}?q=${searchText}`);
    return data.items || [];
  } catch (error) {
    throw new Error('Failed to fetch books from Google Books API');
  }
}

export { fetchBooks };
