import express from "express";
import { getLocation,getLocationNbThreads } from "../controllers/controller_location.js";
import middleware from "../middleware/middleware.js"

const location_router = express.Router();

location_router.get("/location", middleware , getLocation);
location_router.get("/location/nbThreads/:city", middleware , getLocationNbThreads);

export default location_router;   