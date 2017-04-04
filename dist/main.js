var roundSetup = require('roundSetup');
var roleHarvester = require('testHarv');
var roleBuilder = require('role.builder');
var roleUpgrader = require('role.upgrader');
var roleMover = require('role.mover');
var mt = require('manualTasks');
var sm = require('spawnManager');



module.exports.loop = function () {

	sm.updateTotals(); //
	sm.spawnIfNeeded();

	for (var name in Game.creeps) {
		var creep = Game.creeps[name];
		// mt.findClose(creep); not sure why it's here
		//console.log(creep, "is a ", creep.memory.role);
		switch (creep.memory.role) {
		case 'harvester':
			//console.log(creep, "is a ", creep.memory.role);
			roleHarvester.run(creep);
			break;
		case 'builder':
			roleBuilder.run(creep);
			break;
		case 'upgrader':
			roleUpgrader.run(creep);
			break;
		case 'mover':
			roleMover.run(creep);
			break;
		default:
			console.log(creep, " has no memory.role");
		}
		// if(Game.spawns["Spawn1"].energy >= 300){
		//     //console.log("Spawn1 has 300 or more energy; Spawing a creep now");
		//     Game.spawns["Spawn1"].createCreep([WORK,MOVE,MOVE,CARRY,CARRY]);
		// }

	}
};
