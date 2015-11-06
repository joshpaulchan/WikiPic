//// Globals

var uploadButton = document.getElementById('upBtn');
var UPLOAD_URL = 'api/upload';

//// Dropzone

// Set Dropzone options
Dropzone.options.uploadFormDD = {
	url: UPLOAD_URL,
	paramName: "image",
	maxFilezie: 2,
	clickable: false,
	acceptedFiles: 'image/*',
	init: function() {
		// Add event listeners for file change
		this.on('addedfile', function(file) {
			// if (hasFiles(this)) { enableUpload(uploadButton); }
		});
		this.on('removedfile', function(file) {
			// if (!hasFiles(this)) { disableUpload(uploadButton); }
		});
		this.on('complete', function(file) {
			var klaxon = new Klaxon("Upload complete.", 3);
			klaxon.show();
		})
	}
};

// Add handler for upload

var hasFiles = function(el) {
	// Checks if dropzone has files
	return (el.files.length > 0);
}

var __removeClass = function(el) {
	el.className.replace( /(?:^|\s)MyClass(?!\S)/g , '' );
}

var enableUpload = function(el) {
	// Enables the upload button
	// console.log(el);
	// Functional change
	el.disabled = false;
	// Visual change
	el.className = "btn btn-primary";
}

var disableUpload = function(el) {
	// Disables the button state
	// console.log(el);
	// Functional change
	el.disabled = true;
	// Visual change
	el.className = "btn btn-disabled";
}

//// Submission

var inputFS = document.getElementById('uploadFormFS');

inputFS.addEventListener('change', function(e) {
	// console.dir(this);
	var node = document.getElementById('uploadFormFS-inp');
	if (hasFiles(node)) {
		enableUpload(uploadButton);
	} else {
		disableUpload(uploadButton);
	}
});

uploadButton.addEventListener('click', function(e) {
	e.preventDefault();
	console.log("Sending files to server...");
	// console.dir(inputFS);
	var node = document.getElementById('uploadFormFS-inp');
	if (hasFiles(node)) {

		// Retrieve data list
		var files = node.files;
		var formData = new FormData();

		// Get data from list
		for (var i = 0; i < files.length; i++) {
			var file = files[i];
			formData.append('photos[]', file, file.name);
		}

		console.log(formData);
		// Send request
		var xhr = new XMLHttpRequest();

		xhr.open('POST', UPLOAD_URL, true);

		xhr.onload = function() {
			var msg = 'Upload ';
			if (xhr.status === 200) {
				inputFS.reset();
				msg += 'complete :)!';
			} else {
				msg += 'failed :/.';
			}

			var klaxon = new Klaxon(msg, 3);
			klaxon.show();
			return false;
		}
		xhr.send(formData);
	}
	return false;
});
