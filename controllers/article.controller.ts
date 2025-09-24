import { type Request, type Response } from 'express';
import * as articleService from '../services/article.service.js';

export const createArticle = async (req: Request, res: Response) => {
    console.log('[POST /api/articles] Creating a new article.');
    try {
        const article = await articleService.createArticle(req.body);
        console.info(`[POST /api/articles] Article created successfully with ID: ${article._id}`);
        res.status(201).json(article);
    } catch ( error: any ) {
        console.error('[POST /api/articles] Failed to create article:', error);
        res.status(500).json({ error: error.message });
    }
};

export const getArticles = async (req: Request, res: Response) => {
    console.log('[GET /api/articles] Fetching all articles.');
    try {
        const articles = await articleService.getArticles();
        console.info(`[GET /api/articles] Successfully retrieved ${articles.length} articles.`);
        res.json(articles);
    }
    catch( error: any ) {
        console.error('[GET /api/articles] Failed to fetch articles:', error);
        res.status(500).json({error: error});
    }
};

export const getArticleById = async (req: Request, res: Response) => {
    console.log(`[GET /api/articles/:id] Fetching article with specific id`);
    
    const id : string | undefined = req.params.id;
    if(id === undefined) {
        console.warn(`[GET /api/articles/:id] Invalid id`);
        return res.status(400).json({error: 'Invalid id'});
    }

    const article = await articleService.getArticleById(id);
    if(!article) {
        console.warn(`[GET /api/articles/:id] Article with ID ${id} not found.`);
        return res.status(404).json({error: 'No article with this id'});
    }

    console.info(`[GET /api/articles/:id] Article with ID ${id} retrieved successfully.`);
    res.json(article);

};

export const updateArticle = async (req: Request, res: Response) => {
    console.info(`[PUT /api/articles/:id] Updating article`);

    const id : string | undefined = req.params.id;
    const body : string | undefined = req.body;
    if(id === undefined) {
        console.warn(`[PUT /api/articles/:id] Invalid id`);
        return res.status(400).json({error: 'Invalid id'});
    }

    if(body === undefined) {
        console.warn(`[PUT /api/articles/:id] Invalid request body`);
        return res.status(400).json({error: 'Invalid body'}); 
    }

    const article = await articleService.updateArticle(id, body);
    if(!article) {
        console.warn(`[PUT /api/articles/:id] Article with ID ${id} not found for update.`);
        return res.status(404).json({error: 'No article with this id'});
    }

    console.info(`[PUT /api/articles/:id] Article with ID ${id} updated successfully.`);
    res.json(article);
};

export const deleteArticle = async (req: Request, res: Response) => {
    console.info(`[DELETE /api/articles/:id] Attempting to delete article`);

    const id : string | undefined = req.params.id;
    if(id === undefined) {
        console.warn(`[DELETE /api/articles/:id] Invalid id`);
        return res.status(400).json({error: 'Invalid id'});
    }

    const article = await articleService.deleteArticle(id);
    if(!article) {
        console.warn(`[DELETE /api/articles/:id] Article with ID ${id} not found for deletion.`);
        return res.status(404).json({error: 'No article with this id'});
    }

    console.info(`[DELETE /api/articles/:id] Article with ID ${id} deleted successfully.`);
    res.json({message: 'Deleted succesfully'});
}