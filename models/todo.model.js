const mongoose = require('mongoose')
const Schema = mongoose.Schema

const todoSchema = new Schema({
    text : {
        type: String,
        required: true
    },
    
    description:{type: String},
    category: {
        type: String,
        enum: ['Work', 'Personal', 'Shopping', 'Others'],
        default: 'Others'
    },
    priority : {
        type: String,
        enum: ['High', 'Medium', 'Low'],
        default: 'High'
    },
    completed:{
        type: Boolean,
        default: false
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {timestamps: true});

const Todos = mongoose.model('Todos', todoSchema);
module.exports = Todos