/* global require */
/* global __dirname */
// jshint esversion: 6

var path = require('path');
var express = require('express');
var morgan = require('morgan');
var chalk = require('chalk');

var app = express();
var port = process.argv[2] || 8080;

morgan.token('color_status', (req, res) => {
    if (res.statusCode < 300) {
        return chalk.green(res.statusCode);
    }
    else if (res.statusCode >= 300 && res.statusCode < 400) {
        return chalk.yellow(res.statusCode);
    }
    else if (res.statusCode > 400) {
        return chalk.red(res.statusCode);
    }
});

app.use(morgan(':remote-addr - ' +
    '[:date] ' +
    chalk.cyan('":method :url ') +
    chalk.gray('HTTP/:http-version" ') +
    ':color_status ' +
    ':res[content-length] ' +
    'time=:response-time ms'));

app.use(express.static(path.join(__dirname + '/../dist')));

app.listen(port);

console.log('Server listening on port ' + chalk.green(port));
