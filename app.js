const express = require('express');
const cors = require('cors');
const todoRoutes = require('./routes/todo.routes');
const authRoutes = require('./routes/auth.routes')

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/todos', todoRoutes);
app.use('/api/auth', authRoutes);

module.exports = app;