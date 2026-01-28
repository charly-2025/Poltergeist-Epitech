import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from 'cookie-parser'; 
import { config } from 'dotenv';

import register_router from "./routes/register.js";  
import threads_router from "./routes/threads.js";

import swaggerUi from "swagger-ui-express"
import swaggerJsDoc from "swagger-jsdoc";


config({ path: '../.env' });   

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));   
app.use(cors({
  origin: '*',
  credentials: true
}));
app.use(cookieParser()); 

app.set('trust proxy', true);

app.use('/', register_router);
app.use('/', threads_router);   
app.get('/', function (req, res) {
    console.log(req.ip)
    res.send();
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("connected"))
  .catch((err) => console.error(err));


app.listen(3000, '0.0.0.0' ,() => console.log("Server running on port 3000"));




const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Poltergeist API Documentation ',
      version: '1.0.0',
    },
    servers: [
      {
        url: 'http://localhost:3000/'
      }
    ],
  },
  apis: ['./controllers/*.js'],      
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));   