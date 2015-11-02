//
// Uploader
//
// Written by Joshua Paul A. Chan

var express = require('express');
var multer = require('multer');
var app = express();
var upload = multer({ dest: './uploads/'});

app.use(express.static(__dirname + '/assets'));

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

// VIEWS
app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});

app.get('/upload/', function(req, res) {
	res.sendFile(__dirname + '/assets/upload.html');
})

app.get('/gallery', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});

// API
var API_ROOT = '/api';

app.post(API_ROOT + '/upload', function(req, res) {
	upload(req, res, function(err) {
		if (err) {
			return res.end("Error uploading the file.");
		}
		res.end("FIled is uploaded");
	});
});

api.get(API_ROOT + '/images', function(req, res) {
	// TODO:
	// Send JSON response with array of images with names, thumbnails and links that need to be copied
	console.log('Fetching image info..');
})


// MAIN
app.listen(3000, function() {
	console.log("Listening on *:3000");
});
