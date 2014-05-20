
var Probability = require('./probability.js');

var Link = function (sender, reader) {
	this.sender = sender;
	this.reader = reader;
	this.weight = new Probability();
};

module.exports = Link;
