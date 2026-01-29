import mongoose from "mongoose";

/**
 * @swagger
 * /location:
 *   get:
 *     summary: search locations by city or country
 *     tags: [Location]
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         required: true
 *         description: Search for city or country 
 *     responses:
 *       200:
 *         description: List of location which match with the search
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   location_city:
 *                     type: string
 *                   location_country:
 *                     type: string
 *       400:
 *         description: Search parameter should not be null
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
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
        res.status(200).json(locations);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};     
 