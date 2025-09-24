import {Article, type IArticle} from '../models/article.model.js';

export const getArticles = async () : Promise<IArticle[]> => {
    return Article.find();
};

export const createArticle = async (data: any) => {
    const article = new Article(data);
    return article.save();
}

export const getArticleById = async (id: string) => {
    return Article.findById(id);
}

export const updateArticle = async (id: string, data: any) => {
    return Article.findByIdAndUpdate(id, data, { new: true });
}

export const deleteArticle = async (id: string) => {
    return Article.findByIdAndDelete(id);
}