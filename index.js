//
// Uploader
//
// Written by Joshua Paul A. Chan

var express = require('express');
var multer = require('multer');
var app = express();
var upload = multer({ dest: './uploads/'});

app.use(multer({
	dest: './uploads/',
	rename: function(fieldname, filename) {
		return filename + '_' + Date.now();
	},
	onFileUploadStart: function(file) {
		console.log("Uploading [" + file.name + "]...");
	},
	onFileUploadComplete: function(file) {
		console.log("Completed upload of [" + file.name + "]...");
	}
}));

// Route root
app.get('/', function(req, res) {
	res.sendFile(__dirname + '/assets/index.html');
});

// Upload route
app.post('/api/upload', function(req, res) {
	upload(req, res, function(err) {
		if (err) {
			return res.end("Error uploading the file.");
		}
		// res.end("FIled is uploaded");
	});
});

app.listen(3000, function() {
	console.log("Listening on *:3000");
});
