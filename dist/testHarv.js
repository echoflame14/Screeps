module.exports = {

	run: function (creep) {

		let spawn = Game.spawns["Spawn1"];
		let storeTarget;
		if (spawn.energy < 300) {
			storeTarget = spawn;
		} else {
			storeTarget = creep.room.find(FIND_STRUCTURES, {
				filter: (structure) => {
					return (structure.structureType == STRUCTURE_EXTENSION) &&
						structure.energy < structure.energyCapacity;
				}
			});
			storeTarget = _.sortBy(storeTarget, a => creep.pos.getRangeTo(a));
			storeTarget = storeTarget[0];
		}
		//console.log("storeTarget = ", storeTarget);
		//console.log(storeTarget);
		let sources = creep.room.find(FIND_SOURCES_ACTIVE);
		//	console.log("sources before filter = ", sources);
		// ToDo add logic to send creep to different source's harvest spots are full
		//	console.log("sources after filter = ", sources);
		let targets = _.sortBy(sources, s => creep.pos.getRangeTo(s));
		//console.log("targets = ", targets);

		//console.log(creep, ".carry.energy = ", creep.carry.energy);
		if (creep.carry.energy < creep.carryCapacity) {
			if (creep.memory.harvestTarget === 1) {
				if (creep.harvest(targets[1]) === ERR_NOT_IN_RANGE) {
					creep.moveTo(targets[1]);
				}
			}
			if (creep.memory.harvestTarget === 0) {
				if (creep.harvest(targets[0]) === ERR_NOT_IN_RANGE) {
					creep.moveTo(targets[0]);
				}
			} else {
				if (creep.harvest(targets[0]) === ERR_NOT_IN_RANGE) {
					creep.moveTo(targets[0]);
				}
			}

		} else {
			//console.log("too far away to transfer to ", storeTarget[0]);
			if (creep.transfer(storeTarget, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
				creep.moveTo(storeTarget);
			}
		}


	}



};
