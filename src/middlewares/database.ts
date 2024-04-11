import * as sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import * as fs from 'fs';
import * as path from 'path';

const dbFileName = 'books.db';
const dbPath = path.resolve(dbFileName);

async function connectDatabase() {
  try {
    const dbExists = fs.existsSync(dbPath);

    if (!dbExists) {
      fs.closeSync(fs.openSync(dbPath, 'w'));
      console.log('SQLite database created successfully');
    }

    const db = await open({
      filename: dbPath,
      driver: sqlite3.Database
    });

    // Create the "books" table if it doesn't exist
    await db.exec(`
      CREATE TABLE IF NOT EXISTS books (
        id TEXT,
        title TEXT,
        thumbnail TEXT,
        subtitle TEXT,
        searchInfo TEXT
      )
    `);

    console.log('Connected to SQLite database');
    return db;
  } catch (error) {
    throw new Error(`Error connecting to SQLite database: ${error.message}`);
  }
}

export { connectDatabase };
