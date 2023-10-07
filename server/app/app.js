import express from "express";
import mongoose from "mongoose";

// import { models } from "/models/index.js";
import cors from 'cors';
import route from "./routes/index.js";

//  import { Course } from "./models";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

route(app);

const connection = mongoose.connect('mongodb://127.0.0.1:27017/local');
// const connection = mongoose.connect('mongodb+srv://barterapp:barterapp123@cluster0.nvi4r08.mongodb.net/production');

export default app;




