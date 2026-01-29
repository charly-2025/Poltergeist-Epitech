import express from "express";
import { getLocation } from "../controllers/controller_location.js";
import middleware from "../middleware/middleware.js"

const location_router = express.Router();

location_router.get("/location", middleware , getLocation);

export default location_router;   