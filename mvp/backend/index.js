import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from 'cookie-parser'; 
import { config } from 'dotenv';

import register_router from "./routes/register.js";  
import threads_router from "./routes/threads.js";
import checkAuth_router from "./routes/verifyCookie.js";

import user_router from "./routes/user.js";

import swaggerUi from "swagger-ui-express"
import swaggerJsDoc from "swagger-jsdoc";
import location_router from "./routes/location.js";


config({ path: '../.env' });   

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));   
app.use(cors({
  origin: "http://localhost:3001",
  credentials: true
}));
app.use(cookieParser()); 

app.set('trust proxy', true);

app.use('/', checkAuth_router);
app.use('/', register_router);
app.use('/', threads_router);   
app.use('/', location_router); 
app.use('/', user_router); 
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
app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerDocs));   