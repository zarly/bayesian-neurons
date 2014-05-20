
var Probability = function () {
	this.pos = 1;
	this.neg = 1;
};

Probability.prototype.incPos = function () {
	this.pos++;
};

Probability.prototype.incNeg = function () {
	this.neg++;
};

Probability.prototype.reset = function () {
	this.pos = 1;
	this.neg = 1;
};

Probability.prototype.getProbability = function () {
	return this.pos / (this.pos + this.neg);
};

module.exports = Probability;
