"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const mongoose = require('mongoose');
/**
 * Connects to the MongoDB database.
 * @returns {Promise<void>}
 */
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose.connect('mongodb://localhost:27017/react-posts');
        console.log('MongoDB connected');
    }
    catch (error) {
        if (error instanceof Error) {
            console.error('MongoDB connection failed:', error.message);
        }
        else {
            console.error('An unknown error occurred:', error);
        }
        process.exit(1);
    }
});
module.exports = connectDB;
