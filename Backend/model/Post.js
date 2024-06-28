const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title : {
        type : String, 
        required : true
    },
    details : {
        type : String, 
        required : true
    },
    bloodGroup : {
        type : String, 
        required : true
    },
    interested : {
        type : Number,
        default : 0
    }
});

module.exports = mongoose.model('Post', postSchema);