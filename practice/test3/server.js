const express = require('express');
const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true })); // parses incoming requests with urlencoded payloads
app.use(express.json()); // parses incoming requests with JSON payloads

app.set('view engine', 'ejs');

// use logger on individual endpoint
app.get('/', logger, (req, res) => {
    res.render('index');
});

const userRouter = require('./routes/users');

app.use('/users', userRouter)

function logger(req, res, next) {
    console.log(req.originalUrl)
    next()
};

app.listen(3000);