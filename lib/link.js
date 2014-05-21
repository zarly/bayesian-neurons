
var Probability = require('./probability.js');

var Link = function (sender, reader) {
	this.sender = sender;
	this.reader = reader;
	
	this.signal = false;
	
	this.conditionalProbability = new Probability();
	this.unconditionalProbability = new Probability();
};

Link.prototype.setSignal = function (signal) {
	this.signal = signal;
};

Link.prototype.feedback = function (result) {
		if (this.signal) {
			this.unconditionalProbability.incPos();
		} else {
			this.unconditionalProbability.incNeg();	
		}
		
		if (result) {
			if (this.signal) {
				this.conditionalProbability.incPos();
			} else {
				this.conditionalProbability.incNeg();
			}
		}
};

Link.prototype.reset = function (signal) {
	this.signal = false;
};

module.exports = Link;
