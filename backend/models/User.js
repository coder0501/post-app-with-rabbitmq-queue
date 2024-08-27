"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
/**
 * Mongoose schema for the User model.
 */
const UserSchema = new mongoose_1.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});
// Adding a pre-save hook to handle the updatedAt field.
UserSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});
exports.default = (0, mongoose_1.model)('User', UserSchema);
