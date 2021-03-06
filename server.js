const express = require('express');
// const favicon = require('express-favicon');
const path = require('path');
const port = process.env.PORT || 3001;
const app = express();
// app.use(favicon(__dirname + '/build/favicon.ico'));
// the __dirname is the current directory from where the script is running
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));
app.get('/ping', function (req, res) {
 return res.send('ping');
});
app.get('/', function (req, res) {
  res.send("Testing123");
});
app.listen(port);