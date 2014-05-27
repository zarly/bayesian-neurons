require('should');
var Neiron = require('../lib/neiron.js');
	
describe('logical verification tests', function(){
	it('should solve AND task', function(){
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
			[0,0,0], 
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
	});
});
