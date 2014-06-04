
var Probability = function () {
	this.oldPos = 1;
	this.oldNeg = 1;
	this.pos = 1;
	this.neg = 1;
};

Probability.prototype.incPos = function () {
	this.pos++;
};

Probability.prototype.incNeg = function () {
	this.neg++;
};

Probability.prototype.updateWeights = function () {
	this.oldPos = this.pos;
	this.oldNeg = this.neg;
};

Probability.prototype.reset = function () {
	this.pos = 1;
	this.neg = 1;
};

Probability.prototype.getProbability = function () {
	return this.oldPos / (this.oldPos + this.oldNeg);
};

module.exports = Probability;
