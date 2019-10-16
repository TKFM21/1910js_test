const express = require('express');
const router = express.Router();

router
    .route('/')
    .get(router.getTodos);
    // .get('/', (req, res) => {
    //     res.render('index', {note: 'index!!!'});
    // })
    // .get('/quiz', (req, res) => {
    //     res.render('quiz', {comment: 'comm'});
    // });

module.exports = router;