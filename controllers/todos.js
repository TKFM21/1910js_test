const Todo = require('../models/Todo');

module.exports = {
    getTodos: (req, res) => {
        const storedTodos = Todo.findAll();
        res.status(200).json(storedTodos);
    },
    postTodo: (req, res) => {
        try {
            const {title, body} = req.body;
            const createdTodo = Todo.create({title, body});

            res.status(200).json(createdTodo);
        } catch (error) {
            res.status(400).json({message: error.message});
        }
    },
    putTodo: (req, res) => {
        const id = req.params.id;
        const {title, body} = req.body;
        const parsedId = parseInt(id, 10);

        try {
            const updatedTodo = Todo.update({
                id: parsedId,
                title,
                body
            });
            res.status(200).json(updatedTodo);
        } catch (error) {
            res.status(400).json({message: error.message});
        }
    },
    removeTodo: (req, res) => {
        const id = req.params.id;
        const parsedId = parseInt(id, 10);

        try {
            const removeTodo = Todo.remove(parsedId);
            res.status(200).json(removeTodo);
        } catch (error) {
            res.status(400).json({message: error.message});
        }
    }
};