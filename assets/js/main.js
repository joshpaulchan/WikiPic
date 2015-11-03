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
	el.className = "centered btn btn-lg btn-primary";
}

var disableUpload = function(el) {
	// Disables the button state
	// console.log(el);
	// Functional change
	el.disabled = true;
	// Visual change
	el.className = "centered btn btn-lg btn-disabled";
}

//// Submission

var inputFS = document.getElementById('uploadFormFS');

inputFS.addEventListener('click', function() {
	// console.log(this);

	// if hasFiles(this) {
	// 	enableUpload(uploadButton);
	// } else {
	// 	disableUpload(uploadButton);
	// }
});

uploadButton.addEventListener('click', function() {
	console.log("Sending files to server...");
	// TODO
	var inputDD = document.getElementById('uploadFormDD');
	// Check if either the dnd has or the FS has
	if (hasFiles(inputDD)) {
		inputDD.submit();
	} else if (hasFiles(inputFS)) {
		inputFS.submit();
	}
	inputDD.reset();
	inputFS.reset();
	// TODO: Fire notification
});

var submitFiles = function(el) {
	// Submit the data of the selected input element
	el.submit();
}
