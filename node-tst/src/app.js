'use strinct'

const express = require('express');
const bodyParser = require('body-parser');
const userRoute = require('./routes/user');

const APIprefix = '/api/';

const app = express();
const router = express.Router();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
 
//Load Routes API
app.use([APIprefix, 'users'].join(''), userRoute);

module.exports = app;
