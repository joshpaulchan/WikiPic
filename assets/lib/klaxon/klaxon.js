//// Klaxon.JS
//// Tiny JS Library for creating alerts
////
//// Written by Joshua Paul A. Chan

var Klaxon = (function() {

	var Klaxon = function(msg, duration) {
		// Constructor
		this.alertMessage = (msg != null) ? msg : 'alert';
		this.timeoutDuration = (duration != null) ? duration*1000: 2000;
		this.selectorId = null;
	}

	Klaxon.prototype.destroy = function() {
		console.log("Destroying alert..");
		var node = document.getElementById(this.selectorId);
		node.parentNode.removeChild(node);
	}

	Klaxon.prototype.setMessage = function(msg) {
		this.alertMessage = msg;
	}

	Klaxon.prototype.setTimeout = function(duration) {
		this.timeoutDuration = duration;
	}

	Klaxon.prototype.show = function() {
		// Start the timeout sequence
		console.log("Showing alert...");

		// 1. Show it
		var alertList = document.getElementById('alert-list');

		// 1.a) build node
		var node = document.createElement('div');
		node.className = "klaxon";
		this.selectorId = node.id = "alert-" + Date.now();

		var nodeText = document.createTextNode(this.alertMessage);
		node.appendChild(nodeText);

		// 1.b) insert into body;
		alertList.insertBefore(node, alertList.firstChild);

		// 2. Start the timeout
		var that = this;
		window.setTimeout(function() {
			that.destroy();
		}, this.timeoutDuration);
	}

	return Klaxon;
})();
