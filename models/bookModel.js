import mongoose from "mongoose";

const bookSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },

        cel: {
            type: Number,
            required: true,
        },


        imagen: {
            type: String,
            required: true,
        },

        imagePublicId: {
            type: String,
            required: true,
        },


        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        categoria: {
            type: String,
            required: true,
        }


    },
    {
        versionKey: false,
        timestamps: true
    }

);

export const Book = mongoose.model('Cat', bookSchema);