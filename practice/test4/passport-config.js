const LocalStrategy = require('passport-local').Strategy;

function initialize(passport) {
    const users = {
        username: 'admin',
        password: 'Admin&8181'
    }
    // passport local strategy for local-login, local refers to this app
    passport.use('local-login', new LocalStrategy(
        function (username, password, done) {
            if (username === users.username && password === users.password) {
                return done(null, users);
            } else {
                return done(null, false, {"message": "User not found."});
            }
        })
    );

    // passport needs ability to serialize and unserialize users out of session
    passport.serializeUser(function (user, done) {
        done(null, users);
    });
    passport.deserializeUser(function (id, done) {
        done(null, users);
    });
}

module.exports = initialize
 
