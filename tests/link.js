require('should');
var Link = require('../lib/link.js');

it('should have required fields', function(){
	var link = new Link();
	link.connect.should.be.a.Function;
	link.signal.should.be.a.Function;
	link.handle.should.be.a.Function;
	link.resetSignals.should.be.a.Function;
	link.feedback.should.be.a.Function;
	
	link.pos.should.be.a.Number;
	link.neg.should.be.a.Number;
});