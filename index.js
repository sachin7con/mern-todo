// // SGN 
// const express = require('express')
// // const fs = require('fs')
// // const mongoose = require('mongoose')
// // require('dotenv').config();
// const Todos = require('./models/todo.model.js')
// const todoRoutes = require('./routes/todo.routes');


// // let todos = [];

// const app = express();
// // mongoose.connect(process.env.MONGO_URI)
// // .then(res => { console.log("Wohooo!, Mongo db connected successfully ")})
// // .catch(err => {console.log(err)})

// app.use(express.json());
// app.use('/api/todos', todoRoutes);


// // // CRUD using file system 

// // const readTodosFromfile = () =>{
// //      try{
// //         const data = fs.readFileSync('./todos.json', 'utf8')
// //         todos = JSON.parse(data);
// //         console.log('File has been read successfully');
// //      }
// //      catch(error){
// //         console.error('error in reading file:', error);
// //         todos = [];
// //      }
// // }
// // const writeTodosToFile = () =>{
// //     try{
// //         const data = todos.stringify(todos);
// //         fs.writeFileSync('./todos.json', todos, "utf8");
// //         console.log("File written successfully");
// //     }
// //     catch(error){
// //         console.error('Error in writing Todos File', error)
// //     }
// // }


// // readTodosFromfile();

// // app.get('/todos', (req, res)=>{
// //     res.json(todos);
// // })

// // app.post('/todo', (req, res)=> {
// //     const {text} = req.body;
// //     let newTask = { "id": todos.length +1, "task": text }
// //     todos.push(newTask);
// //     writeTodosToFile();
// //     res.status(200).json(newTask);
// // })


// //CRUD using db
// app.get('/todos', async (req, res) => {
//     try{
    
//     const todos = await Todos.find();
//         res.status(200).json({status:"Success", data: todos})
//     }
//     catch(err) {
//         console.log(err);
//         res.status(500).json({status: "Failure", message: err.message})
//     }})


// app.post('/todo', async (req, res) =>{
//     try { const {text} = req.body;
//         const newTodo = new Todos({
//             text
//         })

//         await newTodo.save()
//         .then(response => {
//             res.status(201).json({status:"Success", message:"New Todo saved successfully!", data:response})
//     }) }
//     catch(err) {
//         console.log(err);
//         res.status(500).json({status:"Failure", message:"Server Error"})
//     }
// })

// app.put('/todo/:id', async(req, res) => {
//     try{
//         const { id } = req.params;
//         const updatedTodo = await Todos.findByIdAndUpdate(id, req.body, {new: true} )
         
//         if(!updatedTodo){
//             return res.status(400).json({status:"Failure", message: "Todo not found"})
//          }

//         res.status(200).json({status:"Successfully updated", data: updatedTodo })
//     }
//     catch(err){
//         console.log(err);
//         res.status(400).json({status: "Failure", message: "Failed to update todos"})

//     }
// })

// app.delete('/todo/:id', async (req, res) =>{
//     try{
//         const { id } = req.params;
//         const deletedTodo = await Todos.findByIdAndDelete(id)
//         if(!deletedTodo){
//             return res.status(400).json({status:"Failure", message: "Todo not found"})
//         }

//         res.status(200).json({status:"Success", message:"Todo has been deleted successfully"})
//     }
//     catch(err){
//         console.log(err);
//         res.status(400).json({status: "Failure", message: "Todo can't be delted, pls try again later"})
//     }
// })


// app.listen(3000, ()=>{
//     console.log("Listening to express port 3000")
// })