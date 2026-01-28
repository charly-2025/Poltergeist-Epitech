import Threads from "../models/thread_model.js";

/**
 * @swagger
 * /getThreads?type={type}&search={search}:
 *   get:
 *     summary: get the 50 most recents threads ( just by recents or by proximity)
 *     tags: [Threads]
 *     parameters:
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [recents, proximity]
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: If the type is recents , so it will get the 50 most recent threads and additionnaly where the string 'search' is contained in the thread title.  However if the type is proximity , it will get the 50 threads most recents and where the search string is contained in the thread city value.
 * 
 *     responses:
 *       200:
 *         description: return 50 threads 
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                  properties:
 *                      _id : 
 *                          type : string
 *                          exemple : "a10b45157z4z"
 *                      author_id:
 *                          type: number
 *                      thread_title:
 *                          type : string
 *                      thread_content:
 *                          type : string
 *                      thread_country:
 *                          type : string
 *                      thread_city:
 *                          type : string
 *                      thread_likes :
 *                          type : array
 *                      thread_replies : 
 *                          type : array
 *                      thread_favorite :
 *                          type : array
 *                      thread_random_profile_picture :
 *                          type : number   
 *                      createdAt : 
 *                          type : timestamp
 *                      updatedAt : 
 *                          type : timestamp
 *                      thread_id:
 *                          type: number
 *                      __v : 
 *                          type : number
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

        res.status(200).json(threads);
    } catch (err) {
    res.status(400).json({ message: err.message });
    }
};

/**
 * @swagger
 * /threads:
 *   post:
 *     summary: create a new thread
 *     tags: [Threads]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - thread_title
 *               - thread_content
 *               - thread_country
 *               - thread_city
 *             properties:
 *               thread_title:
 *                 type: string
 *               thread_content:
 *                 type: string
 *               thread_country:
 *                 type: string
 *               thread_city:
 *                 type: string
 *     responses:
 *       200:
 *         description: return the json object of created thread 
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                  properties:
 *                      _id : 
 *                          type : string
 *                      author_id:
 *                          type: number
 *                      thread_title:
 *                          type : string
 *                      thread_content:
 *                          type : string
 *                      thread_country:
 *                          type : string
 *                      thread_city:
 *                          type : string
 *                      thread_likes :
 *                          type : array
 *                      thread_replies : 
 *                          type : array
 *                      thread_favorite : 
 *                          type : array
 *                      thread_random_profile_picture :
 *                          type : number   
 *                      createdAt : 
 *                          type : timestamp
 *                      updatedAt : 
 *                          type : timestamp
 *                      thread_id:
 *                          type: number
 *                      __v : 
 *                          type : number
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