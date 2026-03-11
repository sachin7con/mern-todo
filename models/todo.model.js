const mongoose = require('mongoose')
const Schema = mongoose.Schema

const todoSchema = new Schema({
    text : {
        type: String,
        required: true
    },
    description:{type: String},
    catagory: {
        type: String,
        enum: ['Work', 'Personal', 'Shopping', 'Others'],
        default: 'Others'
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {timestamps: true});

const Todos = mongoose.model('Todos', todoSchema);
module.exports = Todos