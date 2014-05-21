require('should');
var Link = require('../lib/link.js');

it('should have required fields', function(){
	var link = new Link({}, {});
	
	link.setSignal.should.be.a.Function;
	link.feedback.should.be.a.Function;
	link.reset.should.be.a.Function;
	
	link.sender.should.be.an.Object;
	link.reader.should.be.an.Object;
	
	link.signal.should.be.a.Boolean;
	
	link.conditionalProbability.should.be.an.Object;
	link.unconditionalProbability.should.be.an.Object;
});

it('should have correct default values', function(){
	var link = new Link({}, {});
	link.signal.should.be.false;
});