const LocalStrategy = require('passport-local').Strategy;

function initialize(passport) {
    // hardcoded user
    const user = {
        username: 'admin',
        password: 'Admin&8181'
    };

    const authenticateUser = (username, password, done) => {
        if (username !== user.username) {
            return done(null, false, { message: 'No user with that username'});
        } else if (password !== user.password) {
            return done(null, false, { message: 'Wrong password'});
        } else {
            return done(null, user);
        };
    };

    passport.use(new LocalStrategy({ 
        usernameField: 'username', 
        passwordField: 'password' 
    }, authenticateUser))
    passport.serializeUser((user, done) => {done(null, user)});
    passport.deserializeUser((id, done) => {done(null, user)});
};

module.exports = initialize