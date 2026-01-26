let mongoose = require('mongoose');
const autiIncrement = require('mongoose-id-autoincrement');

mongoose.connect("mongodb://localhost:3000/poltergeistdb");

autiIncrement.initialize(db);

let anonyme_schema = new mongoose.Schema ({
    anonyme_id : { type : Number , required : true},
    created_at : { type : Date , required : true},
    
})

userSchema.plugin(autiIncrement.plugin, { model: 'User', field: 'anonyme_id', unique: false });

const user = mongoose.model("User", anonyme_schema);
export default user;
