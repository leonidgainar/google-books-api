import * as dotenv from 'dotenv';
dotenv.config();

const PORT: number = parseInt(process.env.PORT || '3001');
const GOOGLE_API_URL: string = process.env.GOOGLE_API_URL || 'https://www.googleapis.com/books/v1/volumes';

export { PORT, GOOGLE_API_URL };
