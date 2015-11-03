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

inputFS.addEventListener('submit', function(e) {
	e.preventDefault();
	console.log(e);
	$.ajax({
		type: 'POST',
		url: 'api/upload',
		data: e.data
	});
	return false;
});

uploadButton.addEventListener('click', function(e) {
	e.preventDefault();
	console.log("Sending files to server...");
	console.dir(inputFS);
	var node = document.getElementById('uploadFormFS-inp');
	if (hasFiles(node)) {
		// TODO: Submit the photo(s)

		// Fire notification
		var klaxon = new Klaxon("Upload complete.", 3);
		klaxon.show();

		inputFS.reset();
	}
	inputFS.reset();
});

var submitFiles = function(el) {
	// Submit the data of the selected input element
	el.submit();
}
