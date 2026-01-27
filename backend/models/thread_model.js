import mongoose from 'mongoose';


const rep_schema = new mongoose.Schema({
  author_id: { type : Number ,required: [true, 'author ID is required']},
  rep_content: { type : String , required: [true, 'content is required']},
  rep_likes: { type : [Number], default: [] },
  rep: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Rep' }]
}, {timestamps: true}  
);

const reps = mongoose.model('Rep', rep_schema);

const threads_schema = new mongoose.Schema({
  author_id: { type : Number, required: [true, 'author ID is required']},
  thread_title: { type : String , required: [true, 'Title is required']},
  thread_content: { type : String , required: [true, 'content is required']},
  thread_country: {type : String, required: [true, 'country is required']},
  thread_city: {type : String, required: [true, 'city is required']},
  thread_likes: { type : [Number], default: [] },
  thread_replies: {type : [rep_schema], default : []}
},{timestamps: true }
);

export default mongoose.model('Threads', threads_schema);   
