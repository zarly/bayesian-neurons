require('should');
var Probability = require('../lib/probability.js');

it('should have required fields', function(){
	var probability = new Probability();
	probability.incPos.should.be.a.Function;
	probability.incNeg.should.be.a.Function;
	probability.reset.should.be.a.Function;
	probability.getProbability.should.be.a.Function;
	
	probability.pos.should.be.a.Number;
	probability.neg.should.be.a.Number;
});

it('should return correct probability', function(){
	var probability = new Probability();
	probability.incPos();
	probability.incPos();
	probability.incNeg();
	probability.getProbability().should.equal(0.6);
	probability.reset();
	probability.getProbability().should.equal(0.5);
	probability.incNeg();
	probability.incNeg();
	probability.getProbability().should.equal(0.25);
});
