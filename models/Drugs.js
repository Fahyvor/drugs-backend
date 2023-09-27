const express = require('express');
const mongoose = require('mongoose');

const drugSchema = new mongoose.Schema (
    {
        name: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        uses: {
            type: String,
            required: true,
        },
        quantity: {
            type: Number, 
            required: true,
        }
    },
    {timestamps: true}
);

module.exports = mongoose.model('Drug', drugSchema)