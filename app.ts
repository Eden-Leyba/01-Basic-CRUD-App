import express from "express";
import articleRoutes from './routes/article.routes.js';

export const app = express();
app.use(express.json());

app.use('/api/articles', articleRoutes);

