const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    imageUrl : {
        type : String,
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
    dob : {
        type : Date,
        required : true
    },
    gender : {
        type : String,
        required : true
    },
    pin : {
        type : String, 
        required : true
    },
    phoneNumber : {
        type : String,
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
    requests : [{
        type : Schema.Types.ObjectId,
        ref : 'Request'
    }],
    donates : [{
        type : Schema.Types.ObjectId,
        ref : 'Donor'
    }]
}, {timestamps : true});

module.exports =  mongoose.model('User', userSchema);