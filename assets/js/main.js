//// Globals

var uploadButton = document.getElementById('upBtn');

//// Dropzone

// Set Dropzone options
Dropzone.options.uploadFormDD = {
	paramName: "image",
	maxFilezie: 2,
	clickable: false,
	acceptedFiles: 'image/*',
	init: function() {
		// Add event listeners for file change
		this.on('addedfile', function(file) {
			if (hasFiles(this)) { enableUpload(uploadButton); }
		});
		this.on('removedfile', function(file) {
			if (!hasFiles(this)) { disableUpload(uploadButton); }
		});
	}
};

// Add handler for upload

var hasFiles = function(dz) {
	// Checks if dropzone has files
	return (dz.files.length > 0);
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
	el.className = "btn btn-lg btn-primary";
}

var disableUpload = function(el) {
	// Disables the button state
	// console.log(el);
	// Functional change
	el.disabled = true;
	// Visual change
	el.className = "btn btn-lg btn-disabled";
}

//// Submission

uploadButton.addEventListener('click', function() {
	console.log("Sending files to server...");
	// TODO
	// Check if either the dnd has or the FS has

	// Default to the DnD
});

var submitFiles = function(el) {

}
