import * as dotenv from 'dotenv';
dotenv.config(); // Load .env variables

export const API_BASE = process.env.API_BASE || "http://localhost:3000/writing";
