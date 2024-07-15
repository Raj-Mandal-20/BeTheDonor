const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const donorSchema = new Schema({
    userId : {
        type : Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    requestId : {
        type : Schema.Types.ObjectId,
        ref : 'Request',
        required : true
    },
    isDonated : {
        type : Boolean,
        default : false
    }       
});

module.exports = mongoose.model('Donor', donorSchema);
