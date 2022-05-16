const path = require('path')
const express = require('express');
const pug = require('pug')
const { unflatten } = require('flat');
const router = express.Router();

router.get('/', (req, res) => {
    return res.sendFile(path.resolve('views/login.html'))
})

router.post('/auth',(req, res) => {
    var username = req.body.username;

    if (username) {
        if (username === "guest") {
            req.session.regenerate((err) => {
                req.session.username = "guest";
                res.redirect('/guest')
              });
        } 
        // Double check!
        else if (username.toLowerCase() === "jack") {
            if (username.toUpperCase() !== "JACK") {
                req.session.regenerate((err) => {
                    req.session.username = "admin";
                    res.redirect('/admin')
                    });
            } else {
                res.send("Don't impersonate yourself, you're not jack I know🤣🤣🤣")
                res.end();
            }
        } else {
            res.send("User not found, maybe guest?")
            res.end();
        }
    } else {
        res.send('Please enter Username')
        res.end();
    }
})

router.get('/guest', (req, res) => {
    return res.sendFile(path.resolve('views/guest.html'))
})

router.get('/admin', (req, res) => {
    return res.sendFile(path.resolve('views/admin.html'))
})

router.post('/api/admin/user', (req, res) => {
    if (req.session && req.session.username === "admin") {
        const {user} = unflatten(req.body);

        if (user.username !== "") {
            return res.json({
                'response': pug.compile('Hello #{username}, enjoy this app#{emoji}')({username: user.username, emoji: "😀"})
            })
        } else {
            return res.json({
                'response': 'Something went wrong!'
            });
        }
    } else {
        res.send('Sorry, this api cannot be used for guest...')
    }

})

module.exports = router;