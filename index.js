// Index.js

var express = require('express');
var multer = require('multer');
var app = express();
var upload = multer({ dest: './uploads/'});

app.use(multer({
	dest: './uploads/',
	rename: function(fieldname, filename) {
		// TODO
	},
	onFileUploadStart: function(file) {
		// TODO
	},
	onFileUploadComplete: function(file) {
		// TODO
		console.log("Hello");
	}
}));


// Send root
app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});

app.post('/api/upload', function(req, res) {
	upload(req, res function(err) {
		if (err) {
			return res.end("Error.");
		}
		res.end("FIled is uploaded");
	});
});

app.listen(3000, function() {
	console.log("Listening on *:3000");
});
