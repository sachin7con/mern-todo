const Todo = require('../models/todo.model');

// GET ALL
exports.getTodos = async (req, res) => {
    try {
        const { catagory, search } = req.query;
        let query = { user: req.user.id } // Always filter by the logged-in user
        // const todos = await Todo.find({ user: req.user.id });  //// for user related find 
        
        const todos = await Todo.find(query).sort({ createdAt: -1});
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ message: "Error fetching todos" });
    }
};

// CREATE
exports.createTodo = async (req, res) => {
    try {
        const { text, catagory } = req.body;  // <-- include catagory

        const newTodo = await Todo.create({
            text,
            catagory,            // <-- set selected category
            user: req.user.id
        });

        res.status(201).json({ status: "Success", data: newTodo });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error creating todo" });
    }
};

// UPDATE
exports.updateTodo = async (req, res) => {
    try {
        // const { id } = req.params;

        const updated = await Todo.findOneAndUpdate({_id: req.params.id, user: req.user.id }, req.body, { new: true });

        if (!updated) {
            return res.status(404).json({ message: "Todo not found" });
        }

        res.status(200).json(updated);
    } catch (error) {
        res.status(500).json({ message: "Error updating todo" });
    }
};

//Toggle Completed 
exports.toggleTodo = async(req, res) =>{
    try{
        const todo = await Todo.findOne({
            _id: req.params.id,
            user: req.user.id
        })

        if(!todo){
            res.status(400).json({message:"Todo not found" })
        }
        todo.completed = !todo.completed; // ✅ toggle correctly
        await todo.save();
        res.json(todo);
    }
    catch(err){
        console.log(err);
        res.status(400).json({status:"Failure", message:"Error updating todo"})
    }
}

// DELETE
exports.deleteTodo = async (req, res) => {
    try {
        // const { id } = req.params;

        const deleted = await Todo.findOneAndDelete({_id : req.params.id, user: req.user.id });

        if (!deleted) {
            return res.status(404).json({ message: "Todo not found" });
        }

        res.status(200).json({ message: "Todo deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting todo" });
    }
};