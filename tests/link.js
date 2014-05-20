require('should');
var Link = require('../lib/link.js');

it('should have required fields', function(){
	var link = new Link({}, {});
	link.sender.should.be.an.Object;
	link.reader.should.be.an.Object;
	link.weight.should.be.an.Object;
});