import User from "../models/auth.js";
import jwt from 'jsonwebtoken';


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
        res.cookie('token', token, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 });  
        res.status(201).json({ message: "User registered" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


/**
 * @swagger
 * /getUserInfos:
 *   get:
 *     summary: get the location and the id of the user "connected" thanks to his token
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
