var express = require('express');
var consign = require('consign');
var body_parser = require('body-parser');
var express_validator = require('express-validator');

var app = express();

app.set('view engine', 'ejs');
app.set('views', './app/views');

app.use(express.static('./app/public'));

app.use(body_parser.urlencoded({extended: true}));

app.use(express_validator());

consign()
    .include('./app/routes')
    .then('app/models')
    .then('app/controllers')
    .into(app);

module.exports = app;