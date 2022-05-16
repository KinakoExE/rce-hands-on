const express = require('express');
const app = express();
const session = require('express-session');
const routes = require('./routes');
const path = require('path');
const bodyParser = require('body-parser');

const sess = {
    // hard-coded secret is not a part of this challenge, you must not use this
    secret: 'f75rNdCQvyJesjfWwTc62YWkxbEeHSbzmydpwLR3cKj5wWcWrpcyW2vUpNqwQrNJ9nqBT7NC7ctjZfXJUPtBLZEyqqTmpEcxgsZzpBTkg8b8d4wsAQNSzNu8wB3bqUA8',
    cookie: { maxAge: 60000, httpOnly: true },
    resave: false,
    saveUninitialized: false,
}
  
app.use(session(sess))

app.use(bodyParser.urlencoded({
	extended: false
}));

app.use(bodyParser.json());

app.set('views', './views');
app.use('/static', express.static(path.resolve('static')));

app.use(routes);

app.all('*', (req, res) => {
    return res.status(404).send('404 page not found');
});

app.listen(3000, () => console.log('Listening on port 3000'))
