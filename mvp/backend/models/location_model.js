import mongoose from 'mongoose';

const location_schema = new mongoose.Schema({
  location_city: { type: String, required: [true, 'city is required'] },
  location_country: { type: String, required: [true, 'country is required'] }
});

export default mongoose.model('Location', location_schema);   
