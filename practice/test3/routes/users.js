const express = require('express');
const router = express.Router();

router.use(logger); // use logger on every route 

router.get('/', (req, res) => {
    // req.query.name = /users?name=
    console.log(req.query.name)
    res.send('User List')
});

router.get('/new', (req, res) => {
    res.render('users/new')
});

router.post('/', (req, res) => {
    // req.body.firstName 對應 new.ejs 入面嘅 form > input name="firstName"
    console.log(req.body.firstName);
    console.log(req.body.lastName);
    const isValid = true
    if (isValid) {
        users.push([{ firstName: req.body.firstName }, { lastName: req.body.lastName }])
        res.redirect(`/users/${users.length - 1}`)
    } else {
        console.log('Error')
        res.render('users/new', [{ firstName: req.body.firstName }, { lastName: req.body.lastName }])
    }
});

// router.get('/:id', (req, res) => {
//     res.send(`Get User With ID ${req.params.id}`)
// })

// router.put('/:id', (req, res) => {
//     res.send(`Get User With ID ${req.params.id}`)
// })

// router.delete('/:id', (req, res) => {
//     res.send(`Get User With ID ${req.params.id}`)
// })

router
.route('/:id')
.get((req, res) => {
    res.send(`Get User With ID ${req.params.id}`)
})
.put((req, res) => {
    res.send(`Get User With ID ${req.params.id}`)
})
.delete((req, res) => {
    res.send(`Get User With ID ${req.params.id}`)
});

const users = [{ name: 'Victor' }, { name: 'Victoria' }];

// Param is one of the middleware. Use next function when creating middleware
router.param('id', (req, res, next, id) => {
    req.user = users[id]
    next()
});

function logger(req, res, next) {
    console.log(req.originalUrl)
    next()
};

module.exports = router