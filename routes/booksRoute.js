import express, { response } from "express";
import { SaveBook, deleteBook, getBooks } from "../controllers/BooksController.js";
import {Book} from '../models/bookModel.js';
import { subirImagen } from "../middleware/Storage.js";

const router = express.Router();

router.get('/api/books',getBooks)
router.get('/api/books/:id',getBooks)
router.post('/api/books',subirImagen.single('imagen'),SaveBook)
router.delete('/api/books/:id',deleteBook)

export default router;