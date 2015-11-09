//
// Uploader
//
// Written by Joshua Paul A. Chan

var express = require('express');
var multer = require('multer');
var fs = require('fs-extra');
var app = express();

app.use(express.static(__dirname + '/assets'));
app.use('/images', express.static(__dirname + '/uploads'));


var PMWIKI_DIR = './pw-uploads';
var DL_DIR = './uploads';

var upload = multer({ dest: DL_DIR});
app.use(multer({
	dest: DL_DIR,
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
	res.sendFile(__dirname + '/assets/gallery.html');
});

// API
var API_ROOT = '/api';

app.post(API_ROOT + '/upload', function(req, res) {
	upload(req, res, function(err) {
		if (err) {
			return res.end("Error uploading the file.");
		}
		res.end("File is uploaded");
		// Once file is uploaded, use fs.copy(src, trg, cb) to move to necessary folder
	});
});

app.get(API_ROOT + '/images/all', function(req, res) {
	// Send JSON response with array of images with names and links that need to be copied
	var paths = [];
	fs.walk(DL_DIR).on('data', function(item) {
		var path = item.path;
		// console.log(path);
		if (path.slice(path.lastIndexOf('\\') + 1) != 'uploads') {
			var pathUrl = 'images' + path.slice(path.lastIndexOf('\\'));
			paths.push(pathUrl);
		}
	}).on('end', function() {
		// console.dir(paths);
		console.log('Fetching image info..');
		var items = paths.map(function(path) {
			return ({
				filename: path.slice(path.lastIndexOf('\\') + 1),
				filepath: path
			})
		});
		res.setHeader('Content-Type', 'application/json');
		res.send(JSON.stringify({images: items}));
	});
});

// MAIN
app.listen(3000, function() {
	console.log("Listening on *:3000");
});
