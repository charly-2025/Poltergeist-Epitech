import User from "../models/auth.js";
import jwt from 'jsonwebtoken';
import Threads from "../models/thread_model.js"

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a user as an anonyme user, give him a token thanks to his id which make the token unique
 *     tags: [User]
 *     responses:
 *       201:
 *         description: User registered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User registered"
 *       500:
 *         description: Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */   

export const Register = async (req, res) => {
    try { 
        const ip = req.ip.replace(/^::ffff:/, ''); 
        const user = new User({ 
          ip: ip 
        });   
        await user.save();
        const token = jwt.sign({ userID: user.anonyme_id }, process.env.JWT_SECRET);   
        res.cookie('token', token, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000,secure:false,sameSite:"lax" });  
        res.status(201).json({ message: "User registered" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


/**
 * @swagger
 * /getUserInfos:
 *   get:
 *     summary: retrieve the location and the id of the authenticated user
 *     tags: [User]
 *     responses:
 *       200:
 *         description: return his anonyme_id and the location
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 anonyme_id:
 *                   type: number
 *                 location:
 *                   type: object
 *                   properties:
 *                     country:
 *                       type: string
 *                     city:
 *                       type: string
 *       404:
 *         description: Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User not found"
 *       500:
 *         description: Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */   

export const getUserInfos = async (req, res) => {
    try {
        const userId = req.anonyme_id.userID;
        const infos = await User.findOne({ anonyme_id: userId }).select('anonyme_id location');

        if (!infos) { 
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({
            "anonyme_id": infos.anonyme_id,
            "location": infos.location
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


/**
 * @swagger
 * /getUserThreads:
 *   get:
 *     summary: Retrieve all threads created by the authenticated user
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of threads authored by the user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: integer
 *                   description: Number of threads returned
 *                 threads:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       thread_id:
 *                         type: string
 *                       author_id:
 *                         type: number
 *                       thread_title:
 *                         type: string
 *                       thread_content:
 *                         type: string
 *                       thread_country:
 *                         type: string
 *                       thread_city:
 *                         type: string
 *                       thread_likes:
 *                        type: array
 *                        items:
 *                         type : integer
 *                       thread_favorite:
 *                        type: array
 *                        items:
 *                         type : integer
 *                       thread_replies:
 *                        type: array
 *                        items:
 *                         type : integer
 *                       thread_random_profile_picture:
 *                         type: number
 *                       createdAt:
 *                         format: date-time
 *       404:
 *         description: No threads found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: no threads found
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */   

export const getUserThreads = async (req, res) => {
    try {
        const userId = req.anonyme_id.userID;
        const threads = await Threads.find({ author_id: userId }).select('thread_id author_id thread_title thread_content thread_country thread_city thread_likes thread_favorite threads_replies thread_random_profile_picture createdAt');

        if (!threads) { 
            return res.status(404).json({ message: "no threads found" });
        }

        res.status(200).json({threads});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

/**
 * @swagger
 * /updateLocation:
 *   patch:
 *     summary: update user's location 
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - country
 *               - city
 *             properties:
 *               country:
 *                 type: string
 *               city:
 *                 type: string      
 *     responses:
 *       200:
 *         description: location updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 location:
 *                   type: object
 *                   properties:
 *                     country:
 *                       type: string
 *                     city:
 *                       type: string
 *       400:
 *         description: Country and city are null
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Values should not be null
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */   


export const UpdateLocation = async (req, res) => {
    try {
        const {country, city} = req.body
        const anonyme_id = req.anonyme_id.userID
        if (!country || !city){
            res.status(400).json({message: "Values should not be null"})
        }
        const user = await User.findOneAndUpdate(
            {"anonyme_id" : anonyme_id},
            {$set : {
                "location.country": country,
                "location.city": city
            }},{new: true}
        ).select("anonyme_id location") 
        res.status(200).json({location: user.location})

    }catch (err) {
        res.status(500).json({ error: err.message });
    }
}


