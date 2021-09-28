const express = require('express');
const app = express();
const flash = require('express-flash');
const session = require('express-session');
const passport = require('passport');
const methodOverride = require('method-override');

const initializePassport = require('./passport-config');
initializePassport(passport);

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(flash());
app.use(session({
    secret: 'SECRET',
    resave: false, // dont resave if nothing change
    saveUninitialized: false // dont save empty value in the session
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));

app.get('/', checkAuthenticated, (req, res) => {
    res.render('index', { username: req.user.username });
});

app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('login');
});

app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}));

app.get('/hello', (req, res) => {
    console.log('Hello World');
    res.send('Hello World');
});

app.get('/sortnum', (req, res) => {
    res.send('sortnum');
});

app.post('/sortnum', (req, res) => {
    const numbers = [1, 3, 90, 5, 105, -18];

    numbers.sort((a, b) => {
    return a - b;
    });

    console.log(numbers);
});

app.delete('/logout', (req, res) => {
    req.logOut();
    res.redirect('/login');
});

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/login');
};

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }
    next()
};

app.use((req, res) => {
    res.status(404);
    res.send('404 not found');
});

app.listen(3000);