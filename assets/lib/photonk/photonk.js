//// Photonk.JS
//// Tiny JS Library for creating clickable photo-links (that copy to clipboard when you click em)
////
//// Written by Joshua Paul A. Chan

var Photonk = (function() {

	var Photonk = function(imgName, imgRef, destLink) {
		// Constructor
		this.imgName = imgRef;
		this.imgRef = imgRef;
		this.destLink = destLink;
	}

	Photonk.prototype.copy_to_clipboard = function(e) {
		e.preventDefault();
		// TODO: fix link
		window.prompt("Copy to clipboard: Ctrl+C (or Cmd+C), then Enter.", this.imgRef);
	}

	Photonk.prototype.render_into = function(parentNode) {
		//// Render Photonk node into the parentNode

		// 1.a) build node
		var topNode = document.createElement('div');
		topNode.className = "photonk";

		var destLink = document.createElement('a');
		destLink.href = this.destLink;
		topNode.appendChild(destLink);

		var imgNode = document.createElement('img');
		imgNode.src = this.imgRef;
		imgNode.width = 320;
		imgNode.height = 320;

		var imgName = document.createElement('span');
		var imgNameText = document.createTextNode(this.imgName);
		imgName.className = "photonk-image";
		imgName.appendChild(imgNameText);

		destLink.appendChild(imgNode);
		destLink.appendChild(imgName);

		// 1.b) insert into body;
		parentNode.insertBefore(topNode, parentNode.firstChild);

		// 1.c) Attach onclick
		topNode.onclick = this.copy_to_clipboard.bind(this);
	}

	return Photonk;
})();
