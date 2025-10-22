const mysql = require('mysql2/promise');
require('dotenv').config();

async function createDatabase() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || ''
  });

  const dbName = process.env.DB_NAME || 'futbol_db';
  
  try {
    await connection.execute(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``);
    console.log(`✅ Database '${dbName}' created or already exists`);
  } catch (error) {
    console.error('❌ Error creating database:', error.message);
  } finally {
    await connection.end();
  }
}

createDatabase();
