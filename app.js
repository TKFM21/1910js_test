const express = require('express');
const todoRouter = require('./src/router/todo');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use('/api/todos', todoRouter);

module.exports = app;