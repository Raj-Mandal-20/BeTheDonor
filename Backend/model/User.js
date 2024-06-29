const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    state : {
        type : String,
        required : true
    },
    city : {
        type : String,
        required : true
    },
    district : {
        type : String,
        required : true
    },
    pin : {
        type : Number, 
        required : true
    },
    bloodGroup : {
        type : String,
        required : true
    },
    available : {
        type : Boolean,
        required : true
    },
    posts : [{
        type : Schema.Types.ObjectId,
        ref : 'Post'
    }]
}, {timestamps : true});

module.exports =  mongoose.model('User', userSchema);