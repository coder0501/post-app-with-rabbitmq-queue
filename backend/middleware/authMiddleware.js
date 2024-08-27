"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
/**
 * Middleware to authenticate JWT tokens.
 * @param req - Express request object.
 * @param res - Express response object.
 * @param next - Express next function.
 */
const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        res.status(401).send('Access denied. No token provided.');
        return;
    }
    try {
   
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded;
        next();
    }
    catch (ex) {
        console.log("error");

        res.status(400).send('Invalid token.');
    }
};
exports.default = authMiddleware;
