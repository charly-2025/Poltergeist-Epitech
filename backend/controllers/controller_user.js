import User from "../models/auth.js";
import jwt from 'jsonwebtoken';


/**
 * @swagger
 * /register:
 *   post:
 *     summary: register a user as an anonyme user , give him a token thanks to his id which make the token unique 
 *     tags: [User]
 *     responses:
 *       201:
 *         description: User register
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string:
 *                 message:
 *                   type: st
 *                   example: "User registered"
 *       400:
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
        res.status(400).json({ message: err.message });
    }
};



