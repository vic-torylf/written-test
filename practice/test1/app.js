const express = require('express');
const app = express();
const passport = require('passport');

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.set('views', 'page');

const user = [
    {
        username: 'admin',
        password: 'Admin&8181'
    }
]

passport.use(new LocalStrategy(
    function (username, password, done) {
        user.findOne({ username: username }, function (err, user) {
            if (err) { return done(err); }
            if (!user) { return done(null, false); }
            if (!user.verifyPassword(password)) { return done(null, false); }
            return done(null, user);
        });
    }
));

app.get('/', (req, res) => {
    res.render('index')
});
// a. GET method /hello and return “Hello World”
app.get('/hello', (req, res) => {
    res.redirect('/')
    console.log('Hello World')
});
app.get('/login', (req, res) => {
    res.render('login')
});

app.post('/login', passport.authenticate('local', { failureRedirect: '/login' }), (req, res) => {
    res.redirect('/')
});

app.delete('/logout', (req, res) => {
    req.logOut()
    res.redirect('/login')
})

app.use((req, res) => {
    res.status(404).sendFile('./page/404.html', { root: __dirname });
});

app.listen(3000);