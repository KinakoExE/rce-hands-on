const express = require('express');
const serialize = require('node-serialize');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser());
app.use(express.static('public'));
app.set('view engine', 'ejs');

const PORT = 4444;
const HOST = '0.0.0.0';


const setDefaultCookie = function (req, res, next) {
    if (!req.cookies.profile) {
        res.cookie('profile', Buffer.from(JSON.stringify({ username: "guest", iat: new Date().getTime() })).toString('base64'), {
            maxAge: 900000,
            httpOnly: true
        });
    }
    next();
}

const checkUsername = function (req, res) {
    var cookie = req.cookies.profile;
    if (!cookie) {
        console.error('something is wrong');
        return "guest";
    }
    var str = new Buffer.from(cookie, 'base64').toString();
    var obj = serialize.unserialize(str);
    return obj.username;
}

app.use(setDefaultCookie);

app.get('/', (req, res) => {
    res.render('pages/index', {username: checkUsername(req, res)});
});


app.get('/about', (req, res) => {
    res.render('pages/about', {username: checkUsername(req, res)});
});

app.get('/news', (req, res) => {
    res.render('pages/news', {username: checkUsername(req, res)});
});

app.get('/news/data-breach', (req, res) => {
    res.render('pages/news/data-breach', {username: checkUsername(req, res)});
});

app.get('/login', (req, res) => {
    res.render('pages/login', {username: checkUsername(req, res)});
});


app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
