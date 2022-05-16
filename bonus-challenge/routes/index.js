const path = require('path')
const express = require('express');
const pug = require('pug')
const { unflatten } = require('flat');
const router = express.Router();

router.get('/', (req, res) => {
    return res.sendFile(path.resolve('views/index.html'))
})

router.post('/api/user', (req, res) => {
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
})

module.exports = router;