Bayesian neurons
================

Simple and stabile library for dealing with bayesian neurons.

##Usage##

	var Neiron = require('bayesian-neurons').Neiron;

	var enter = new Neiron();
	var neiron1 = new Neiron();
	var exit = new Neiron();
	enter.linkTo(neiron1); // Create link between neurons
	neiron1.linkTo(exit);

	enter.signalTo(neiron1); // Manually send signal
	neiron1.handle(); // Decide to send signal or not

	exit.feedback(true); // Learn neurons

	neiron.resetSignals(); // Start new iteration

	enter.signalTo(neiron1);

	neiron.isShouldSpike(); // true
