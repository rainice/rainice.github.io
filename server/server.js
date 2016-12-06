'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// testing babel
// var express = require('express');
var path = require('path');

// const app = express();
var app = (0, _express2.default)();

// app.get('/', (req,res) => res.send("./index.html")); // requires babel


// app.use(express.static('output'));
// app.use(express.static(path.join(__dirname, 'output')));
console.log('__dirname: ' + __dirname);
var dirname = __dirname + '/..'; // to get one level lower
console.log('server running dirname: ' + dirname);
app.use(_express2.default.static(dirname));

// app.get('/output/bundle.js', function(req,res) {
// 	// res.type('.js');              // => 'text/html'
// 	res.sendFile(__dirname+"/output/bundle.js");
// });

app.get('/*', function(req,res) {
	// res.type('.html');              // => 'text/html'
  console.log(req.originalUrl);
	// res.sendFile(__dirname+"/../index.html")
});

app.listen(3000, function () {
  console.log("server running on port 3000.");
});