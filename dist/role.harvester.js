module.exports = {
	run: function (creep, storageTarget) {



		if (creep.carry.energy < creep.carryCapacity) {
			// state is working
			//console.log("not at carryCapacity: working now");
			creep.memory.state = true; // true = working
			// creep needs try to harvest
			this.work(creep);
		} else {
			creep.memory.state = false; // false = storing
			// creep needs to try to store
			this.store(creep);
		}
	},
	work: function (creep) {
		var sources = creep.room.find(FIND_SOURCES_ACTIVE);
		var sources = _.sortBy(sources, s => creep.pos.getRangeTo(s));
		//console.log(sources);
		if (creep.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
			//console.log("not in range of source");
			creep.moveTo(sources[0]);
		} else {
			//console.log("WHAT THO+?????");
			creep.harvest(sources[0]);
		}
	},
	store: function (creep) {


		var targets = creep.room.find(FIND_STRUCTURES, {
			filter: (structure) => {
				return (structure.structureType == STRUCTURE_EXTENSION) &&
					structure.energy < structure.energyCapacity;
			}
		});
		var spawns = creep.room.find(FIND_STRUCTURES, {
			filter: (structure) => {
				return (structure.structureType == STRUCTURE_SPAWN) &&
					structure.energy < structure.energyCapacity;
			}
		});
		if (spawns[0].energy < 300) {
			targets = spawns;
		}
		if (creep.transfer(targets[0], RESOURCE_ENERGY, creep.energy) === ERR_NOT_IN_RANGE) {
			//console.log("Not in range, movng to ", targets[0]);
			creep.moveTo(targets[0]);
		}
	}
};
