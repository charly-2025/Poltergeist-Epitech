import Threads from "../models/thread_model.js";
import User from "../models/auth.js";
import jwt from 'jsonwebtoken';

export const Register = async (req, res) => {
    try { 
        const ip = req.ip.replace(/^::ffff:/, ''); 
        const user = new User({ 
          ip: ip 
        });   
        await user.save();
        const token = jwt.sign({ userID: user.anonyme_id }, process.env.JWT_SECRET);   
        res.cookie('token', token, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 ,sameSite:"lax",secure:"false"});  
        res.status(201).json({ message: "User registered" });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};


export const getThreads = async (req, res) => {
    try { 
        const { type = "recents", search } = req.query; 
        let filter = {}

        if (search) {
            if (type === "proximity") {
                filter.$or = [
                    { thread_city : { $regex: search , $options : "i" } }
                ];
            } else {
                filter.thread_title = { $regex: search, $options: "i"} 
            }
        }
        const threads = await Threads.find(filter)
            .sort({createdAt: -1})
            .limit(50);

        res.json(threads)
    } catch (err) {
    res.status(400).json({ message: err.message });
    }
};

export const createThread = async (req, res) => {
    try {
        const thread = await Threads.create({
            author_id: req.anonyme_id.userID,
            thread_title: req.body.thread_title,
            thread_content: req.body.thread_content,
            thread_country: req.body.thread_country,
            thread_city: req.body.thread_city,

        });
        thread.thread_random_profile_picture = thread.author_id * thread.thread_id;
        await thread.save();
        res.status(200).json(thread);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }   
};   