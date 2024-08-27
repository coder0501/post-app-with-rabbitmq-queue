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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Post_1 = __importDefault(require("../models/Post"));
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const rabbitmqService_1 = require("../services/rabbitmqService");
const router = express_1.default.Router();
/**
 * Route to create a Post.
 * @param req - Express request object.
 * @param res - Express response object.
 */
router.post('/', authMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = new Post_1.default(Object.assign({}, req.body));
        (0, rabbitmqService_1.addToQueue)(post);
        return new Promise((resolve) => {
            setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
                try {
                    yield post.save();
                    resolve(res.status(201).json(post));
                }
                catch (error) {
                    resolve(res.status(500).json({ error: 'Failed to save post' }));
                }
            }), 500); // Simulate long-running task
        });
    }
    catch (error) {
        return res.status(500).json({ error: 'Failed to create post' });
    }
}));
/**
 * Route to fetch Posts with caching.
 * @param req - Express request object.
 * @param res - Express response object.
 */
let cache = {};
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { query } = req;
    const cacheKey = JSON.stringify(query);
    if (cache[cacheKey]) {
        return res.json(cache[cacheKey]);
    }
    try {
        const posts = yield Post_1.default.find(query);
        cache[cacheKey] = posts;
        setTimeout(() => {
            delete cache[cacheKey];
        }, 300000); // Cache invalidation after 5 minutes
        return res.json(posts);
    }
    catch (error) {
        return res.status(500).json({ error: 'Failed to fetch posts' });
    }
}));
exports.default = router;
