module.exports = {

	updateTotals: function () {
		// purpose = update the memory in game of the total number of each type of creep
		let spawn = Game.spawns["Spawn1"];
		spawn.memory.totals = {
			harvesters: 0,
			upgraders: 0,
			builders: 0,
			movers: 0
		};

		let spawnMem = spawn.memory;
		let creepsArr = Game.creeps;

		for (let i in creepsArr) {
			switch (creepsArr[i].memory.role) {
			case 'harvester':
				spawn.memory.totals.harvesters++;
				break;
			case 'upgrader':
				spawnMem.totals.upgraders++;
				break;
			case 'builder':
				if (spawnMem.totals.builders) {
					spawnMem.totals.builders++;
				} else {
					spawnMem.totals.builders = 0;
				}
				break;
			case 'mover':
				if (spawnMem.totals.movers) {
					spawnMem.totals.movers++;
				} else {
					spawnMem.totals.movers = 0;
				}
				break;
			default:
				console.log("Creep has no role");
			}
		}
	},

	spawnIfNeeded: function () { // spawning creeps if they are needed
		let spawn = Game.spawns["Spawn1"];
		let spawnMem = spawn.memory.totals;
		let creepsArr = Game.creeps;
		let roleTemplates = {
			harv: {
				body: [WORK, WORK, MOVE, CARRY],
				name: undefined,
				state: {
					role: 'harvester',
					needsToMine: true,
					needsToEmpty: false,
					mining: false,
					transfered: false,
					harvestTarget: undefined
				}
			},
			upgr: {
				body: [WORK, MOVE, CARRY, CARRY],
				name: undefined,
				state: {
					role: 'upgrader'
				}
			},
			bldr: {
				body: [WORK, WORK, MOVE, CARRY],
				name: undefined,
				state: {
					role: 'builder'
				}
			}
		};
		let harvesterLimit = 10;
		let upgraderLimit = 1;
		let builderLimit = 1;
		if (spawnMem.harvesters < harvesterLimit) {
			// console.log("creating a creep using roleTemplates.harv");
			if (spawnMem.harvesters < 5) {
				roleTemplates.harv.state.harvesterTarget = 0;
				spawn.createCreep(roleTemplates.harv.body, roleTemplates.harv.name, roleTemplates.harv.state);
			} else {
				roleTemplates.harv.state.harvesterTarget = 1;
				spawn.createCreep(roleTemplates.harv.body, roleTemplates.harv.name, roleTemplates.harv.state);
			}

		} else if (spawnMem.upgraders < upgraderLimit) {
			//console.log("creating a creep with roleTemplates.upgr");
			spawn.createCreep(roleTemplates.upgr.body, roleTemplates.upgr.name, roleTemplates.upgr.state);
			//console.log(spawn.createCreep(roleTemplates.upgr.body, roleTemplates.upgr.name, roleTemplates.upgr.state));
		} else if (spawnMem.builders < builderLimit) {
			spawn.createCreep(roleTemplates.bldr.body, roleTemplates.bldr.name, roleTemplates.bldr.state);
		}




	}



};
