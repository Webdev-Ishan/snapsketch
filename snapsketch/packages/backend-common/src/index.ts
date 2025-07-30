import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../../../.env") }); 

export const JWT_SECRET = process.env.JWT_SECRET || "secret";
export const RESEND_API_KEY = process.env.RESEND_API_KEY;
export const CLOUDINARY_NAME = process.env.CLOUDINARY_NAME;
export const CLOUDINARY_URL = process.env.CLOUDINARY_URL;
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
