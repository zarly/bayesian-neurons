
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

Neiron.prototype._getLinkForGotter = function (gotter) {
	return this.outputs.filter(function (link) {
		return link.reader === gotter;
	})[0] || null;
};

Neiron.prototype.signalTo = function (gotter) {
	this.sended.push(gotter);
	gotter.gotted.push(this);
	
	var link = this._getLinkForGotter(gotter);
	link.signal = true;
};

Neiron.prototype.handle = function () {
	if (this.isShouldSpike()) {
		this.unconditionalSpike();
	}
};

Neiron.prototype._getTotalConditionalInputsProbability = function () {
	var probability = 0.5;
	for(var i=0; i<this.inputs.length; i++) {
		var link = this.inputs[i];
		probability *= link.getConditionalProbability();
	}
	return probability;
};

Neiron.prototype._getTotalUnconditionalInputsProbability = function () {
	var probability = 0.5;
	for(var i=0; i<this.inputs.length; i++) {
		var link = this.inputs[i];
		probability *= link.getUnconditionalProbability();
	}
	return probability;
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
	for(var i = 0; i < this.outputs.length; i++) {
		this.signalTo(this.outputs[i].reader);
	}
};

Neiron.prototype.resetSignals = function () {
	this.sended.length = 0;
	this.gotted.length = 0;
	
	for(var i=0; i<this.inputs.length; i++) {
		this.inputs[i].signal = false;
	}
};

Neiron.prototype.feedback = function (result) {
	if (result) {
		this.spikeHistoricalProbability.incPos();
	} else {
		this.spikeHistoricalProbability.incNeg();
	}
	for(var i=0; i<this.inputs.length; i++) {
		var link = this.inputs[i];
		link.feedback(result);
	}
};

Neiron.seq = 0;

module.exports = Neiron;
