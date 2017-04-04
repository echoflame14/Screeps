var roundSetup = require('roundSetup');
var roleHarvester = require('testHarv');
var roleBuilder = require('role.builder');
var roleUpgrader = require('role.upgrader');
var roleMover = require('role.mover');
var mt = require('manualTasks');
var sm = require('spawnManager');
var essentialUpdates = require('essentialUpdates');



module.exports.loop = function () {

	sm.updateTotals(); //
	sm.spawnIfNeeded();
	essentialUpdates.run();
	let returnText = {};
	for (var name in Game.creeps) {
		var creep = Game.creeps[name];
		// mt.findClose(creep); not sure why it's here
		//console.log(creep, "is a ", creep.memory.role);
		switch (creep.memory.role) {
		case 'harvester':
			//console.log(creep, "is a ", creep.memory.role);
			returnText.harvesterStatus = roleHarvester.run(creep);
			break;
		case 'builder':
			returnText.buildStatus = roleBuilder.run(creep);
			break;
		case 'upgrader':
			returnText.upgraderStatus = roleUpgrader.run(creep);
			break;
		case 'mover':
			returnText.moverStatus = roleMover.run(creep);
			break;
		default:
			console.log(creep, " has no memory.role");
		}

	}
};
