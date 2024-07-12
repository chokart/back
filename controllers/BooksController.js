import * as fs from 'fs';
import { Book } from '../models/bookModel.js';
import cloudinary from '../cloudinary.js';

export const SaveBook = async (request, response) => {
    try {
        const { title, cel, description, price, categoria } = request.body;
        const file = request.file;

        const validacion = validar(title, cel, description, price, categoria, file, 'Y');
        if (validacion.length === 0) {
            // Subir la imagen a Cloudinary
            const result = await cloudinary.uploader.upload(file.path);

            // Crear el nuevo libro con la URL y el public_id de la imagen en Cloudinary
            const newBook = new Book({
                title: title,
                cel: cel,
                description: description,
                price: price,
                categoria: categoria,
                imagen: result.secure_url,
                imagePublicId: result.public_id // Guardar el public_id
            });

            // Guardar el libro en la base de datos
            await newBook.save();

            // Eliminar la imagen del sistema de archivos local
            fs.unlinkSync(file.path);

            return response.status(200).json({ status: true, message: 'Libro guardado correctamente' });
        } else {
            return response.status(400).json({ status: false, errors: validacion });
        }
    } catch (error) {
        return response.status(500).json({ status: false, errors: [error.message] });
    }
};

const validar = (title, cel, description, price, categoria, img, sevalida) => {
    const errors = [];
    if (title === undefined || title.trim() === '') {
        errors.push('El título no debe estar vacío');
    }
    if (cel === undefined || cel.trim() === '' || isNaN(cel)) {
        errors.push('El cel no debe estar vacío y debe ser numérico');
    }
    if (description === undefined || description.trim() === '') {
        errors.push('La descripción no debe estar vacía');
    }
    if (price === undefined || price.trim() === '' || isNaN(price)) {
        errors.push('El precio no debe estar vacío y debe ser numérico');
    }
    if (categoria === undefined || categoria.trim() === '') {
        errors.push('La categoría no debe estar vacía y debe ser válida');
    }
    if (sevalida === 'Y' && img === undefined) {
        errors.push('Selecciona una imagen en formato jpg o png');
    }

    return errors;
};

export const getBooks = async (request, response) => {
    try {
        const { id } = request.params;
        const rows =
            (id === undefined) ? await Book.find() : await Book.findById(id);
        return response.status(200).json({ status: true, data: rows });
    } catch (error) {
        return response.status(500).json({ status: false, errors: [error] });
    }
};

export const deleteBook = async (request, response) => {
    try {
        const { id } = request.params;
        const book = await Book.findById(id);

        if (book) {
            // Eliminar la imagen de Cloudinary
            await cloudinary.uploader.destroy(book.imagePublicId);

            // Eliminar el libro de la base de datos
            await Book.deleteOne({ _id: id });

            return response.status(200).json({ status: true, message: 'Libro eliminado correctamente' });
        } else {
            return response.status(404).json({ status: false, message: 'Libro no encontrado' });
        }
    } catch (error) {
        return response.status(500).json({ status: false, errors: [error.message] });
    }
};