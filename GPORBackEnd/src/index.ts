import 'reflect-metadata';
require("dotenv").config();
import express from "express";
import morgan from "morgan"; 
import cors from "cors";
import { configureExpress } from "./apps/config/configureExpress";

const app = express();

app.use(morgan('combined'));

app.use(cors());

app.use(express.json({ limit: '10mb' }));

configureExpress(app);

app.listen(process.env.PORT, () => {
    console.info(`Starting server on http://localhost: ${process.env.PORT}`);
})