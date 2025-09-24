import {Schema, model, Document} from 'mongoose';

export interface IArticle extends Document {
    title: string;
    content: string;
    author: string;
    tags: string[];
    createdAt: Date;
    updatedAt: Date;
}

const articleSchema = new Schema<IArticle>(
    {
        title: {type: String, required: true},
        content: {type: String, required: true},
        author: {type: String, required: true},
        tags: {type: [String], default: []}
    },
    {
        timestamps: true
    }
);

export const Article = model<IArticle>('Article', articleSchema);