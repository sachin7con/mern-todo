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
        const { text } = req.body;

        const newTodo = await Todo.create({ text,
            user: req.user.id  // for user specific 
         });

        res.status(201).json({status: "Success", data: newTodo} );
    } catch (error) {
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