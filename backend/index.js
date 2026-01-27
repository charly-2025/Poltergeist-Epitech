import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from 'cookie-parser';
import register_router from "./routes/register.js";   
import geocodeRouter from "./routes/geocode.js";


dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser()); 

app.set('trust proxy', true);

app.use('/', register_router); 
app.use("/geocode", geocodeRouter);

app.get('/', function (req, res) {
    console.log(req.ip)
    res.send();
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("connected"))
  .catch((err) => console.error(err));


app.listen(3000, '0.0.0.0' ,() => console.log("Server running on port 3000"));

