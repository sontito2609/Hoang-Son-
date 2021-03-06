const express = require('express');
const engines = require('consolidate');
const app = express();

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

var publicDir = require('path').join(__dirname, '/public');
app.use(express.static(publicDir));
 
app.engine('hbs', engines.handlebars);
app.set('views', './views');
app.set('view engine', 'hbs');

var toyFunction = require('./toy.js');
app.use('/', toyFunction);
const { Server } = require('http');

const PORT = process.env.PORT || 3000;
app.listen(PORT);
