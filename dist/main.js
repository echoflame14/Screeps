var roundSetup = require('roundSetup');
var roleHarvester = require('role.harvester');
var roleBuilder = require('role.builder');
var roleUpgrader = require('role.upgrader');
var roleMover = require('role.mover');
var mt = require('manualTasks');
var sm = require('spawnManager');



module.exports.loop = function () {
	//roundSetup.run();

	//var targetStorgae = roundSetup.run();
    sm.updateTotals(); //

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        // mt.findClose(creep); not sure why it's here
        switch(creep.memory.role){
            case 'harvester':
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
                console.log(creep," has no memory.role");
        }
        // if(Game.spawns["Spawn1"].energy >= 300){
        //     //console.log("Spawn1 has 300 or more energy; Spawing a creep now");
        //     Game.spawns["Spawn1"].createCreep([WORK,MOVE,MOVE,CARRY,CARRY]);
        // }

    }
};
