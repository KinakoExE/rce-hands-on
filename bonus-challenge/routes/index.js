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
        else if (username.toLowerCase() === "kinako") {
            if (username.toUpperCase() !== "KINAKO") {
                req.session.regenerate((err) => {
                    req.session.username = "admin";
                    res.redirect('/admin')
                    });
            } else {
                res.send("Don't impersonate yourself, you're not kinako, I know🤣🤣🤣")
                res.end();
            }
        } else {
            res.send("User not found, you can log in as guest instead!")
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
            var emojis = ["🤣", "😀", "😅", "😁", "😂"]
            var messages = ["have a nice day!", "take care of yourself!", "smile is the best medicine!", "I miss you!"]
            var emoji = emojis[Math.floor(Math.random() * emojis.length)]
            var message = messages[Math.floor(Math.random() * messages.length)]

            return res.json({
                'response': pug.compile('Hello #{username}, #{message}#{emoji}')({username: user.username, message: message, emoji: emoji})
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