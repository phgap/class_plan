var path = require('path');
var express = require("express");
var app = express();

// Run static server
// app.use(function (req, res, next) { setTimeout(next, 1000) });
app.use(express.static(path.join(__dirname, 'html')));
app.listen(8080);