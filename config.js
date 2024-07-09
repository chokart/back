import { config } from 'dotenv';
config();

export const PORT = process.env.PORT;
export const mongoDBURL = process.env.MONGODB_URI;  