import mongoose from 'mongoose';
import { AutoIncrementID } from '@typegoose/auto-increment';
import bcrypt from 'bcrypt'; 

const anonyme_schema = new mongoose.Schema({
  anonyme_id: { type: Number },
  ip: { type: String, required: [true, 'IP is required'] }
},{timestamps : true}
);

anonyme_schema.pre("save", async function () {
  if (!this.isModified("ip")) return;
  this.ip = await bcrypt.hash(this.ip, 10);
});   

anonyme_schema.plugin(AutoIncrementID, { 
  field: 'anonyme_id', 
  startAt: 1 
});

export default mongoose.model('User', anonyme_schema);   
