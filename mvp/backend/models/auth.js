import mongoose from 'mongoose';
import { AutoIncrementID } from '@typegoose/auto-increment';
import crypto from "crypto";

const anonyme_schema = new mongoose.Schema({
  anonyme_id: { type: Number },
  ip: { type: String, required: [true, 'IP is required'] },
  location: { country: { type : String , default : null }, city: { type : String , default : null} }
},{timestamps : true},{ minimize: false }
);

anonyme_schema.pre("save", async function () {
  if (!this.isModified("ip")) return;
  this.ip = crypto
    .createHmac("sha256", process.env.IP_SECRET)
    .update(this.ip)
    .digest("hex") 
});   

anonyme_schema.plugin(AutoIncrementID, { 
  field: 'anonyme_id', 
  startAt: 1 
});

export default mongoose.model('User', anonyme_schema);   
