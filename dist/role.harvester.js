module.exports = {
    run: function(creep, storageTarget){

		if(creep.carry.energy < creep.carryCapacity){
			// state is working
			//console.log("not at carryCapacity: working now");
			creep.memory.state = true; // true = working
			// creep needs try to harvest
			this.work(creep);
		}
		else {
			creep.memory.state = false; // false = storing
			// creep needs to try to store
			this.store(creep);

		}
    },
	work: function(creep){
		var sources = creep.room.find(FIND_SOURCES_ACTIVE);
		var sources = _.sortBy(sources, s => creep.pos.getRangeTo(s));
		//console.log(sources);
		if(creep.harvest(sources[0]) === ERR_NOT_IN_RANGE){
				//console.log("not in range of source");
				creep.moveTo(sources[0]);
		}
		else {
			//console.log("WHAT THO+?????");
			creep.harvest(sources[0]);
		}
	},
	store: function(creep){
		// if(creep.transfer(Game.spawns["Spawn1"], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE){
		// 	creep.moveTo(Game.spawns["Spawn1"]);
		//}


		//console.log("storing");
		var structures = creep.room.find(FIND_STRUCTURES);

		var containers = [];
		for (var a in structures) {
			if(structures[a].structureType === 'container'){
				containers.push(structures[a]);
			}
		}
		//console.log('Containers: BEFORE = ', containers);
		containers = _.sortBy(containers, s => creep.pos.getRangeTo(s));
		//console.log('Containers: After = ', containers);
		if(creep.transfer(containers[0], RESOURCE_ENERGY, creep.carryCapacity) === ERR_NOT_IN_RANGE){
			creep.moveTo(containers[0]);
		}
	}
};
