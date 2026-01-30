import mongoose from "mongoose";
import Threads from "../models/thread_model.js"

/**
 * @swagger
 * /location:
 *   get:
 *     summary: search location and get number of location's number of threads
 *     tags: [Location]
 *     parameters:
 *       - in: query
 *         name: search
 *         required: true
 *         schema:
 *           type: string
 *         description: string to filter location via city or country ( it fetchs max 30 locations )
 *     responses:
 *       200:
 *         description: list of max 30 locations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   city:
 *                     type: string
 *                   country:
 *                     type: string
 *                   nb_threads:
 *                     type: integer
 *       400:
 *         description: search null
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: search should not be null
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */  

export const getLocation = async (req, res) => {
    try {
        const collection = mongoose.connection.db.collection("Location");
        const { search } = req.query;
        if (!search) {
            return res.status(400).json({ message: "search should not be null" });
        }
        const locations = await collection
            .find({
                $or: [
                    { city: { $regex: search, $options: "i" } },
                    { country: { $regex: search, $options: "i" } }
                ]
            })
            .limit(30)
            .toArray();
        const locs_count = await Promise.all(
            locations.map(async (loc) => {
                const nb_threads = await Threads.countDocuments({
                    "thread_city": loc.city 
                });
                return {...loc,nb_threads};
            })
        );
        res.status(200).json(locs_count);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};     
 

export const getLocationNbThreads = async (req, res) => {
  try {
    const { city } = req.params;

    if (!city) {
      return res.status(400).json({ message: "city should not be null" });
    }

    const nb_threads = await Threads.countDocuments({ thread_city: city });

    return res.status(200).json({ nb_threads });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
