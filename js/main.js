var startUp = require('startUp.js');
var roleHarvester = require('role.harvester.js');
var roleBuilder = require('role.builder.js');
var roleUpgrader = require('role.upgrader.js')
var mt = require('manualTasks.js');
var sm = require('spawnManager.js');

module.exports.loop = function () {
// 	startUp.run();

    sm.updateTotals();
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        mt.findClose(creep);
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
            default:
                roleHarvester.run(creep);
        }
        // if(Game.spawns["Spawn1"].energy >= 300){
        //     //console.log("Spawn1 has 300 or more energy; Spawing a creep now");
        //     Game.spawns["Spawn1"].createCreep([WORK,MOVE,MOVE,CARRY,CARRY]);
        // }

    }
};
