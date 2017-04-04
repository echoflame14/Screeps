module.exports = {

	run: function (creep) {
		let statusToReturn = [];
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
		let sources = creep.room.find(FIND_SOURCES_ACTIVE);
		let targets = sources;
		if (creep.carry.energy < creep.carryCapacity) {
			if (creep.memory.harvesterTarget === 0) {
				if (creep.harvest(targets[0]) === ERR_NOT_IN_RANGE) {
					creep.moveTo(targets[0]);
				}
			}
			if (creep.memory.harvesterTarget === 1) {
				if (creep.harvest(targets[1]) === ERR_NOT_IN_RANGE) {
					creep.moveTo(targets[1]);
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
