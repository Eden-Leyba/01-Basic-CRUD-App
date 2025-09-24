import mongoose from "mongoose";

import dotenv from "dotenv";
dotenv.config({path: './config.env'});

import { app } from './app.js';

const connectDB = async () => {
    const mongo_uri_base : string | undefined = process.env.MONGO_URI_BASE;
    const mongo_password : string | undefined = process.env.MONGO_PASSWORD;
    if(mongo_uri_base === undefined || mongo_password === undefined) {
        console.log("Error: Either mongo_uri_base or mongo_password are undefined");
        return;
    }
    console.log("Succesfully identified mongo uri string");
    const DB_URI = mongo_uri_base.replace('<PASSWORD>',mongo_password);
    try {
        await mongoose.connect(DB_URI as string);
        console.log("Connected to the Database!");
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

connectDB();

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})