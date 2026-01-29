import Threads from "../models/thread_model.js";
import User from "../models/auth.js"



/**
 * @swagger
 * /getThreads:
 *   get:
 *     summary: Retrieve threads based on type and search query
 *     tags: [Threads]
 *     parameters:
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [recents, proximity]
 *         description: Type of thread list to get
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search string for thread's title
 *     responses:
 *       200:
 *         description: List of max 50 threads
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   author_id:
 *                     type: number
 *                   thread_title:
 *                     type: string
 *                   thread_content:
 *                     type: string
 *                   thread_country:
 *                     type: string
 *                   thread_city:
 *                     type: string
 *                   thread_likes:
 *                     type: array
 *                     items:
 *                       type : integer
 *                   thread_replies:
 *                     type: array
 *                     items:
 *                       type : integer
 *                   thread_favorite:
 *                     type: array
 *                     items:
 *                       type : integer
 *                   thread_random_profile_picture:
 *                     type: number
 *                   createdAt:
 *                     type: string
 *                     format: timestamp
 *                   updatedAt:
 *                     type: string
 *                     format: timestamp
 *                   thread_id:
 *                     type: number
 *                   __v:
 *                     type: number
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 example:
 *                   value: "User location is null"
 */   

export const getThreads = async (req, res) => {
    try {
        const { type = "recents", search } = req.query;
        const userId = req.anonyme_id?.userID;

        let filter = {};
        if (type === "proximity" && userId) {
            const user = await User.findOne({ anonyme_id: userId });
            const userCity = user?.location?.city;

            if (userCity) {
                filter.thread_city = { $regex: userCity, $options: "i" };
            } else {
                return res.status(400).json({ message: "User location is null" });
            }
        }
        if (search) {
            filter.thread_title = { $regex: search, $options: "i" };
        }
        const threads = await Threads.find(filter)
            .sort({ createdAt: -1 })
            .limit(50);
        res.status(200).json(threads);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};     


/**
 * @swagger
 * /thread:
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
 *                        type: array
 *                        items:
 *                         type : integer
 *                      thread_replies : 
 *                        type: array
 *                        items:
 *                         type : integer
 *                      thread_favorite : 
 *                        type: array
 *                        items:
 *                         type : integer
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
        res.status(500).json({ message: err.message });
    }   
};   

/**
 * @swagger
 * /threads/{threadId}/like:
 *   post:
 *     summary: Like or unlike a thread
 *     tags: [Threads]
 *     parameters:
 *       - in: path
 *         name: threadId
 *         required: true
 *         schema:
 *           type: number
 *         description: The auto incremented ID of the thread to like
 *     responses:
 *       200:
 *         description: Thread liked or already liked
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Thread liked
 *       404:
 *         description: Thread not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Thread not found
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


export const likeThread = async(req, res) => {
    try {
        const userID = req.anonyme_id.userID
        const threadId = req.params.threadId
        if (!threadId){
            return res.status(404).json({message:"thread does not exist"})}

        const thread = await Threads.findOne({ thread_id: threadId });

        if (thread.thread_likes.includes(userID)){
            thread.thread_likes.pull(userID)
            await thread.save();
            return res.status(200).json({ message: "unliked" });}
        else {
            thread.thread_likes.push(userID)}
        await thread.save();
        return res.status(200).json({ message: "liked" });
        
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

/**
 * @swagger
 * /threads/{threadId}/favorite:
 *   post:
 *     summary: favorite or unfavorite a thread
 *     tags: [Threads]
 *     parameters:
 *       - in: path
 *         name: threadId
 *         required: true
 *         schema:
 *           type: number
 *         description: The auto incremented ID of the thread to favorite
 *     responses:
 *       200:
 *         description: Thread favorited or already favorited
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Thread favorited
 *       404:
 *         description: Thread not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Thread not found
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

export const favoriteThread = async(req, res) => {
    try {
        const userID = req.anonyme_id.userID
        const threadId = req.params.threadId

        if (!threadId){
            return res.status(404).json({message:"thread does not exist"})}

        const thread = await Threads.findOne({ thread_id: threadId });

        if (thread.thread_favorite.includes(userID)){
            thread.thread_favorite.pull(userID)
            await thread.save();
            return res.status(200).json({ message: "unadded" });}
        else {
            thread.thread_favorite.push(userID)}
        await thread.save();
        return res.status(200).json({ message: "added" });
        
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

/**
 * @swagger
 * /threads/{threadId}:
 *   delete:
 *     summary: delete one of your thread
 *     tags: [Threads]
 *     parameters:
 *       - in: path
 *         name: threadId
 *         required: true
 *         schema:
 *           type: number
 *         description: The auto incremented ID of the thread to delete
 *     responses:
 *       200:
 *         description: thread deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Thread deleted
 *       404:
 *         description: Thread not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Thread not found 
 *       400:
 *         description: the author id is not the same as the userID 
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: You are not the author of this thread
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

export const deleteThread = async(req, res) => {
    try {
        const userID = req.anonyme_id.userID
        const ID_Thread = req.params.threadId
        
        const thread_infos = await Threads.findOne({ thread_id : ID_Thread })
        console.log(thread_infos.author_id, thread_infos.thread_id, ID_Thread)
        if (!thread_infos){
            res.status(404).json({
                message : "Thread not found"
            })
        }

        if (thread_infos.author_id != userID){
            res.status(400).json({
                message: "You are not the author of this thread"
            })
        }else {
            const resultat = await Threads.deleteOne({ thread_id: ID_Thread });   
            if (resultat.deletedCount === 0){
                res.status(400).json({message : "No thread deleted"})
            }
            res.status(200).json({message : "Thread deleted"})
        }

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};




export const addReply = async (req, res) => {
  try {
    const userID = req.anonyme_id.userID;
    const threadId = Number(req.params.threadId);

    const { rep_content, quote_reply_id } = req.body;

    if (!rep_content) {
      return res.status(400).json({ message: "no response" });
    }

    const thread = await Threads.findOne({ thread_id: threadId });
    if (!thread) {
      return res.status(404).json({ message: "thread does not exist" });
    }

    let quote = null;

    if (quote_reply_id) {
      const quoted = thread.thread_replies.id(quote_reply_id);
      if (!quoted) {
        return res.status(404).json({ message: "nothing to quote/quoteid not found" });
      }

      quote = {
        reply_id: quoted._id,
        author_id: quoted.author_id,
        cut: quoted.rep_content.slice(0, 50),
      };
    }

    thread.thread_replies.push({
      author_id: userID,
      rep_content,
      quote,
    });

    await thread.save();

    const newReply = thread.thread_replies[thread.thread_replies.length - 1];
    return res.status(201).json(newReply);

  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
