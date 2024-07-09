import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from 'mongoose';
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

app.use(express.static('public'));  
app.use(booksRoute);



mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('App conectada a la db');
        app.listen(PORT, () => {
            console.log('App is ok');
        });

    })
    .catch((error) => {
        console.log(error);

    });
