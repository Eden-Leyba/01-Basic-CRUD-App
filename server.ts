import mongoose = require("mongoose");
const chalk = require("chalk").default;

import dotenv = require("dotenv");
dotenv.config({path: './config.env'});

const app = require("./app");

const connectDB = async () => {
    const mongo_uri_base : string | undefined = process.env.MONGO_URI_BASE;
    const mongo_password : string | undefined = process.env.MONGO_PASSWORD;
    if(mongo_uri_base === undefined || mongo_password === undefined) {
        console.log(chalk.red("Error: Either mongo_uri_base or mongo_password are undefined"));
        return;
    }
    console.log("Succesfully identified mongo uri string");
    const DB_URI = mongo_uri_base.replace('<PASSWORD>',mongo_password);
    try {
        await mongoose.connect(DB_URI as string);
        console.log(chalk.green("Connected to the Database!"));
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