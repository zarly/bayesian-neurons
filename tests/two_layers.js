require('should');
var Neiron = require('../lib/neiron.js');
	
describe('logical verification tests', function(){
	/*it('should solve COR task', function(){
		function studyCase (io) {
			if (io[0]) enter1.signalTo(exit);
			if (io[1]) enter2.signalTo(exit);
			
			exit.feedback(!!io[2]);
			
			enter1.resetSignals();
			enter2.resetSignals();
			exit.resetSignals();
		}
		
		function checkCase (io) {
			exit.inputs[0].signal.should.be.false;
			exit.inputs[1].signal.should.be.false;
			
			if (io[0]) enter1.signalTo(exit);
			if (io[1]) enter2.signalTo(exit);
			
			if (!!io[2]) {
				exit.isShouldSpike().should.be.true;
			} else {
				exit.isShouldSpike().should.be.false;
			}
			
			enter1.resetSignals();
			enter2.resetSignals();
			exit.resetSignals();
		}
		
		var studuCases = [
			[0,0,1], 
			[0,1,0], 
			[1,0,0], 
			[1,1,1]
		];
		var enter1 = new Neiron();
		var enter2 = new Neiron();
		var exit = new Neiron();
		enter1.linkTo(exit);
		enter2.linkTo(exit);
		
		for (var i=0; i < studuCases.length; i++) {
			studyCase(studuCases[i]);
		}
		
		checkCase(studuCases[0]);
		checkCase(studuCases[1]);
		checkCase(studuCases[2]);
		checkCase(studuCases[3]);
	});*/
	
	it('should solve XOR task', function(){
		function studyCase (io) {
			if (io[0]) enter1.unconditionalSpike();
			if (io[1]) enter2.unconditionalSpike();
			neiron1.handle();
			neiron2.handle();
			
			exit.feedback(!!io[2]);
			
			enter1.resetSignals();
			enter2.resetSignals();
			exit.resetSignals();
		}
		
		function checkCase (io) {
			exit.inputs[0].signal.should.be.false;
			exit.inputs[1].signal.should.be.false;
			
			if (io[0]) enter1.signalTo(exit);
			if (io[1]) enter2.signalTo(exit);
			
			if (!!io[2]) {
				exit.isShouldSpike().should.be.true;
			} else {
				exit.isShouldSpike().should.be.false;
			}
			
			enter1.resetSignals();
			enter2.resetSignals();
			exit.resetSignals();
		}
		
		var studuCases = [
			[0,0,0], 
			[0,1,1], 
			[1,0,1], 
			[1,1,0],
			[0,0,0], 
			[0,1,1], 
			[1,0,1], 
			[1,1,0],
			[0,0,0], 
			[0,1,1], 
			[1,0,1], 
			[1,1,0],
			[0,0,0], 
			[0,1,1], 
			[1,0,1], 
			[1,1,0],
			[0,0,0], 
			[0,1,1], 
			[1,0,1], 
			[1,1,0]
		];
		var enter1 = new Neiron();
		var enter2 = new Neiron();
		var neiron1 = new Neiron();
		var neiron2 = new Neiron();
		var exit = new Neiron();
		enter1.linkTo(neiron1);
		enter1.linkTo(neiron2);
		enter2.linkTo(neiron1);
		enter2.linkTo(neiron2);
		neiron1.linkTo(exit);
		neiron2.linkTo(exit);
		neiron1.spikeHistoricalProbability.incPos();
		neiron2.spikeHistoricalProbability.incNeg();
		/*enter1.outputs[0].conditionalProbability.incPos();
		enter1.outputs[1].conditionalProbability.incNeg();
		enter2.outputs[0].conditionalProbability.incNeg();
		enter2.outputs[1].conditionalProbability.incPos();
		enter1.outputs[0].unconditionalProbability.incPos();
		enter1.outputs[1].unconditionalProbability.incNeg();
		enter2.outputs[0].unconditionalProbability.incNeg();
		enter2.outputs[1].unconditionalProbability.incPos();//*/
		
		for (var i=0; i < studuCases.length; i++) {
			studyCase(studuCases[i]);
		}
		
		checkCase(studuCases[0]);
		checkCase(studuCases[1]);
		checkCase(studuCases[2]);
		checkCase(studuCases[3]);
	});//*/
});
