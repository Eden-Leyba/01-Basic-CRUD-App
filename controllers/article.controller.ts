import { type Request, type Response } from 'express';
import * as articleService from '../services/article.service.js';

export const createArticle = async (req: Request, res: Response) => {
    try {
        const article = await articleService.createArticle(req.body);
        res.status(201).json(article);
    } catch ( error: any ) {
        res.status(500).json({ error: error.message });
    }
};

export const getArticles = async (req: Request, res: Response) => {
    const articles = await articleService.getArticles();
    res.json(articles);
};

export const getArticleById = async (req: Request, res: Response) => {
    const id : string | undefined = req.params.id;
    if(id === undefined) 
        return res.status(400).json({error: 'Invalid id'});
    const article = await articleService.getArticleById(id);
    if(!article) 
        return res.status(404).json({error: 'No article with this id'});
    res.json(article);
};

export const updateArticle = async (req: Request, res: Response) => {
    const id : string | undefined = req.params.id;
    const body : string | undefined = req.body;
    if(id === undefined) 
        return res.status(400).json({error: 'Invalid id'});
    if(body === undefined) 
        return res.status(400).json({error: 'Invalid body'}); 

    const article = await articleService.updateArticle(id, body);
    if(!article) 
        return res.status(404).json({error: 'No article with this id'});

    res.json(article);
};

export const deleteArticle = async (req: Request, res: Response) => {
    const id : string | undefined = req.params.id;
    if(id === undefined) 
        return res.status(400).json({error: 'Invalid id'});
    const article = await articleService.deleteArticle(id);
    if(!article)
        return res.status(404).json({error: 'No article with this id'});

    res.json({message: 'Deleted succesfully'});
}