
var Probability = require('./probability.js');
var Link = require('./link.js');

var Neiron = function (options) {
	options = options || {};	
	
	this.id = ++Neiron.seq;
	this.name = options.name || ('Neiron_' + this.id);
	this.spikeHistoricalProbability = new Probability();
	this.inputs = [];
	this.outputs = [];
	
	// Signals
	this.sended = [];
	this.gotted = [];
};

Neiron.prototype.linkTo = function (reader) {
	var link = new Link(this, reader);
	this.outputs.push(link);
	reader.inputs.push(link);
};

Neiron.prototype.signalTo = function (gotter) {
	this.sended.push(gotter);
	gotter.gotted.push(this);
};

Neiron.prototype.handle = function () {
};

Neiron.prototype._getTotalConditionalInputsProbability = function () {
	return 0.5;
};

Neiron.prototype._getTotalUnconditionalInputsProbability = function () {
	return 0.5;
};

Neiron.prototype._getHistoricalSpikeProbability = function () {
	return this.spikeHistoricalProbability.getProbability();
};

Neiron.prototype._getPredictedProbability = function () {
	return this._getTotalConditionalInputsProbability() *
			 this._getHistoricalSpikeProbability() /
			 this._getTotalUnconditionalInputsProbability();
};

Neiron.prototype.isShouldSpike = function () {
	return this._getPredictedProbability() >= 0.5;
};

Neiron.prototype.unconditionalSpike = function () {
};

Neiron.prototype.resetSignals = function () {
	this.sended.length = 0;
	this.gotted.length = 0;
};

Neiron.prototype.feedback = function () {
};

Neiron.seq = 0;

module.exports = Neiron;
