module.exports = {
	run: function(creep){

		var structures = creep.room.find(FIND_STRUCTURES);
	    var containers = [];
	    for (var a in structures) {
		   	if(structures[a].structureType === 'container' && structures[a].store[RESOURCE_ENERGY] >= creep.carryCapacity){
		   		containers.push(structures[a]);
		   	}
	   }

	   var containers = _.sortBy(containers, s => creep.pos.getRangeTo(s));

	   if (creep.carry.energy === creep.carryCapacity) {
		   if(creep.transfer(Game.spawns["Spawn1"], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE){
		   	creep.moveTo(Game.spawns["Spawn1"]);
		   }
	   }
	   else if(creep.withdraw(containers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
		   creep.moveTo(containers[0]);
	   }
	}
};
