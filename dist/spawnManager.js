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
				spawnMem.totals.builders++;
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
				largeBody: [WORK, WORK, WORK, WORK, MOVE, CARRY, CARRY],
				xtraLargeBody: [WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE],
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
				largeBody: [WORK, WORK, WORK, MOVE, CARRY, CARRY],
				name: undefined,
				state: {
					role: 'builder'
				}
			}
		};
		let totalHarvesters = 0;
		for (let i in Game.spawns.creeps) {
			if (Game.spawns["Spawn1"].creeps.state.role === 'harvester') {
				totalHarvesters++;
			}
			console.log(totalHarvesters);
		}
		let harvesterLimit = 14;
		let upgraderLimit = 14;
		let builderLimit = 3;
		console.log(Game.rooms['W35N52'].energyAvailable);
		let E = Game.rooms['W35N52'].energyAvailable;
		if (spawnMem.harvesters < harvesterLimit) {
			if (E < 650) {
				// console.log("creating a creep using roleTemplates.harv");
				console.log("spawning a small harvester");
				if (spawn.memory.oddOrEven === 1) {
					spawn.memory.oddOrEven = 0;
					roleTemplates.harv.state.harvesterTarget = 0;
					spawn.createCreep(roleTemplates.harv.body, roleTemplates.harv.name, roleTemplates.harv.state);
				} else {
					spawn.memory.oddOrEven = 1;
					roleTemplates.harv.state.harvesterTarget = 1;
					spawn.createCreep(roleTemplates.harv.body, roleTemplates.harv.name, roleTemplates.harv.state);
				}

			} else if (E < 650) {
				console.log("spawning a LARGE harvester");
				if (spawn.memory.oddOrEven === 1) {
					spawn.memory.oddOrEven = 0;
					roleTemplates.harv.state.harvesterTarget = 0;
					spawn.createCreep(roleTemplates.harv.largeBody, roleTemplates.harv.name, roleTemplates.harv.state);
				} else {
					spawn.memory.oddOrEven = 1;
					roleTemplates.harv.state.harvesterTarget = 1;
					spawn.createCreep(roleTemplates.harv.largeBody, roleTemplates.harv.name, roleTemplates.harv.state);
				}

			} else {
				if (spawn.memory.oddOrEven === 1) {
					console.log("spawning an XXXTRALARGEHARVEESTER");
					spawn.memory.oddOrEven = 0;
					roleTemplates.harv.state.harvesterTarget = 0;
					spawn.createCreep(roleTemplates.harv.xtraLargeBody, roleTemplates.harv.name, roleTemplates.harv.state);
				} else {
					console.log("spawning an XXXTRALARGEHARVEESTER");
					spawn.memory.oddOrEven = 1;
					roleTemplates.harv.state.harvesterTarget = 1;
					spawn.createCreep(roleTemplates.harv.xtraLargeBody, roleTemplates.harv.name, roleTemplates.harv.state);
				}
			}
		} else if (spawnMem.upgraders < upgraderLimit) {
			//console.log("creating a creep with roleTemplates.upgr");
			console.log("spawning a small ugrader");
			spawn.createCreep(roleTemplates.upgr.body, roleTemplates.upgr.name, roleTemplates.upgr.state);
			//console.log(spawn.createCreep(roleTemplates.upgr.body, roleTemplates.upgr.name, roleTemplates.upgr.state));
		} else if (spawnMem.builders < builderLimit) {
			if (E < 450) {
				console.log("spawning a small builder");
				spawn.createCreep(roleTemplates.bldr.body, roleTemplates.bldr.name, roleTemplates.bldr.state);
			} else if (E < 650) {
				console.log("spawning a LARGE builder");
				spawn.createCreep(roleTemplates.bldr.largeBody, roleTemplates.bldr.name, roleTemplates.bldr.state);
			} else {
				console.log("spawning an XXXTRA_LARGE builder");
				spawn.createCreep(roleTemplates.bldr.xtraLargeBody, roleTemplates.bldr.name, roleTemplates.bldr.state);
			}

		}




	}



};
