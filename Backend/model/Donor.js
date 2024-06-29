const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const donorSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    city : {
        type : String, 
        required : true
    },
    pin : {
        type : Number,
        required : true
    },
    phoneNo : {
        type : Number,
        requried: true
    },
    bloodGroup : {
        type : String,
        required : true
    },
    requestId : {
        type : Schema.Types.ObjectId,
        ref : 'Request',
        required : true
    }           
});

module.exports = mongoose.model('Donor', donorSchema);
