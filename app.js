const express = require('express');
const todoRouter = require('./src/router/todo');

const PORT = 3001;
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use('/api/todos', todoRouter);

app.listen(PORT, () => {
    console.log(`Server Listening on PORT:${PORT}`);
});