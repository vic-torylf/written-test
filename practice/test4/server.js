const express = require('express');
const app = express();
const session = require('express-session');
const passport = require('passport');

const initializePassport = require('./passport-config');
initializePassport(passport);

app.use(express.urlencoded({ extended: true }));
 
// initialize passposrt and and session for persistent login sessions
app.use(session({
    secret: "tHiSiSasEcRetStr",
    resave: true,
    saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
 
// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
 
    res.sendStatus(401);
}
 
app.get("/", function (req, res) {
    res.send("Hello!");
});
 
// api endpoints for login, content and logout
app.get("/login", function (req, res) {
    res.send("<p>Please login!</p><form method='post' action='/login'><input type='text' name='username'/><input type='password' name='password'/><button type='submit' value='submit'>Submit</buttom></form>");
});
app.post("/login", 
    passport.authenticate("local-login", { failureRedirect: "/login"}),
    function (req, res) {
        res.redirect("/content");
});
app.get("/content", isLoggedIn, function (req, res) {
    res.send("Congratulations! you've successfully logged in.");
});
app.get("/logout", function (req, res) {
    req.logout();
    res.send("logout success!");
});
 
// launch the app
app.listen(3030);
console.log("App running at localhost:3030");