require('should');
var Neiron = require('../lib/neiron.js');

it('should have required fields', function(){
	var neiron = new Neiron();
	neiron.linkTo.should.be.a.Function;
	neiron.signalTo.should.be.a.Function;
	neiron.handle.should.be.a.Function;
	neiron.resetSignals.should.be.a.Function;
	neiron.feedback.should.be.a.Function;
	neiron._getTotalConditionalInputsProbability.should.be.a.Function;
	neiron._getTotalUnconditionalInputsProbability.should.be.a.Function;
	neiron._getHistoricalSpikeProbability.should.be.a.Function;
	neiron._getPredictedProbability.should.be.a.Function;
	neiron.isShouldSpike.should.be.a.Function;
	neiron.unconditionalSpike.should.be.a.Function;
	
	neiron.id.should.be.a.Number;
	neiron.name.should.be.a.String;
	
	neiron.spikeHistoricalProbability.should.be.an.Object;
	neiron.inputs.should.be.an.Array;
	neiron.outputs.should.be.an.Array;
});

describe('default values', function(){
	it('should be ready for strike by default', function(){
		var neiron = new Neiron();
		neiron.isShouldSpike().should.be.true;
	});
	
	it('getPredictedProbability should be 0.5 by default', function(){
		var neiron = new Neiron();
		neiron._getPredictedProbability().should.equal(0.5);
	});
	
	it('getHistoricalSpikeProbability should be 0.5 by default', function(){
		var neiron = new Neiron();
		neiron._getHistoricalSpikeProbability().should.equal(0.5);
	});
	
	it('getTotalConditionalInputsProbability should be 0.5 by default', function(){
		var neiron = new Neiron();
		neiron._getTotalConditionalInputsProbability().should.equal(0.5);
	});
	
	it('getTotalUnconditionalInputsProbability should be 0.5 by default', function(){
		var neiron = new Neiron();
		neiron._getTotalUnconditionalInputsProbability().should.equal(0.5);
	});
});
	
describe('basic mechanics', function(){
	it('should add record to inputs and outputs', function(){
		var sender = new Neiron();
		var reader = new Neiron();
		
		sender.inputs.length.should.equal(0);
		sender.outputs.length.should.equal(0);
		reader.inputs.length.should.equal(0);
		reader.outputs.length.should.equal(0);
		
		sender.linkTo(reader);
		
		sender.inputs.length.should.equal(0);
		sender.outputs.length.should.equal(1);
		reader.inputs.length.should.equal(1);
		reader.outputs.length.should.equal(0);
	});
	
	it('handle should send signal if probability allows', function(){
		var sender = new Neiron();
		var reader = new Neiron();
		sender.linkTo(reader);
				
		sender.outputs[0].signal.should.be.false;
		reader.inputs[0].signal.should.be.false;
		
		sender.sended.length.should.equal(0);
		sender.gotted.length.should.equal(0);
		reader.sended.length.should.equal(0);
		reader.gotted.length.should.equal(0);		
		
		sender.signalTo(reader);
		
		sender.outputs[0].signal.should.be.true;
		reader.inputs[0].signal.should.be.true;
		
		sender.sended.length.should.equal(1);
		sender.gotted.length.should.equal(0);
		reader.sended.length.should.equal(0);
		reader.gotted.length.should.equal(1);
		
		sender.resetSignals();
				
		sender.sended.length.should.equal(0);
		sender.gotted.length.should.equal(0);
				
		sender.outputs[0].signal.should.be.true;
		
		reader.resetSignals();
		
		reader.sended.length.should.equal(0);
		reader.gotted.length.should.equal(0);
		
		reader.inputs[0].signal.should.be.false;
	});
	
	it('should change link weight when result is positive', function(){
		var sender = new Neiron();
		var reader = new Neiron();
		sender.linkTo(reader);
		sender.signalTo(reader);
		
		reader.inputs[0].conditionalProbability.getProbability().should.equal(0.5);
		reader.inputs[0].unconditionalProbability.getProbability().should.equal(0.5);
		
		reader.feedback(true);
		
		reader.inputs[0].conditionalProbability.getProbability().should.equal(2/3);
		reader.inputs[0].unconditionalProbability.getProbability().should.equal(2/3);
	});
	
	it('feedback should change link weight when result is negative', function(){
		var sender = new Neiron();
		var reader = new Neiron();
		sender.linkTo(reader);
		sender.signalTo(reader);
		
		reader.inputs[0].conditionalProbability.getProbability().should.equal(0.5);
		reader.inputs[0].unconditionalProbability.getProbability().should.equal(0.5);
		
		reader.feedback(false);
		
		reader.inputs[0].conditionalProbability.getProbability().should.equal(0.5);
		reader.inputs[0].unconditionalProbability.getProbability().should.equal(2/3);
	});
	
	it('feedback should change inputs probability', function(){
		var sender = new Neiron();
		var reader = new Neiron();
		sender.linkTo(reader);
		sender.signalTo(reader);
		
		reader._getTotalConditionalInputsProbability().should.equal(0.25);
		reader._getTotalUnconditionalInputsProbability().should.equal(0.25);
		
		reader.feedback(true);
		
		reader._getTotalConditionalInputsProbability().should.equal(1/3);
		reader._getTotalUnconditionalInputsProbability().should.equal(1/3);
	});
	
	it('feedback should change probabilities', function(){
		var sender = new Neiron();
		var reader = new Neiron();
		sender.linkTo(reader);
		sender.signalTo(reader);
		
		reader._getPredictedProbability().should.equal(0.5);
		
		reader.feedback(true);
		sender.resetSignals();
		reader.resetSignals();
		sender.signalTo(reader);
		
		reader._getPredictedProbability().should.equal(2/3);
	});
});
	
describe('logical verification tests', function(){
	it('should be not ready for strike after bed experience', function(){
		var enter = new Neiron();
		var neiron = new Neiron();
		neiron.linkTo(enter);
		neiron.signalTo(enter);
		neiron.handle();
		neiron.feedback(false);
		neiron.resetSignals();
		neiron.signalTo(enter);
		neiron.isShouldSpike().should.be.false;
	});
	/*
	it('should be not ready for strike after bed experience', function(){
		var enter = new Neiron();
		var neiron = new Neiron();
		neiron.connect(enter);
		neiron.signal(enter);
		neiron.handle();
		neiron.feedback(false);
		neiron.resetSignals();
		neiron.signal(enter);
		neiron.isShouldSpike().should.be.false;
	});
	*/
});
