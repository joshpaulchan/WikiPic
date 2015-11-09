// Gallery.JS
// Make request for all images, load them and insert into dom


(function() {
	API_URL = '/api';
	var galleryNode = document.getElementById('gallery');
	var xhr;

	var makeRequest = function(url) {
		xhr = new XMLHttpRequest();

		if (!xhr) {
			console.log("Error creating XMLHttpRequest Instance");
			return false;
		}

		xhr.onreadystatechange = handleResponse;
		xhr.responseType = 'json';
		xhr.open('GET', url);
		xhr.send();
	}

	var handleResponse = function() {
		if (xhr.readyState === XMLHttpRequest.DONE) {
			if (xhr.status === 200) {
				// Handle it
				galleryNode.innerHTML = '';
				console.dir(xhr);
				var data = xhr.response;
				console.log(data);
				var arr = data.images;
				// Loop through the returned JSON data and build photonks
				for (var i = 0; i < arr.length; i++ ) {
					var item = arr[i];

					var fn = item.filename;
					var fp = item.filepath;
					var photonk = new Photonk(fn, fp, fp);

					photonk.render_into(galleryNode);
				}
			} else {
				// Error
				console.log("Whoooops.");
			}
		}
	}
	makeRequest(API_URL + '/images/all');
})();
