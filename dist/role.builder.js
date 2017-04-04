module.exports = {
	run: function (creep) {
		//console.log(creep, " is a builder");
		var needsWork = [];
		var structures = creep.room.find(FIND_STRUCTURES);
		for (var a in structures) {
			if (structures[a].hits < structures[a].hitsMax) {
				needsWork.push(structures[a]);
			}
		}

		//   	needsWork.sort((x,y) => x.hits - y.hits);
		if (needsWork[0] !== undefined) {
			console.log(needsWork[0], ": needs work! ", creep, "moving to bulid now");
			if (creep.carry.energy < creep.carryCapacity) {
				//console.log("not enough energy");
				if (creep.withdraw(Game.spawns["Spawn1"], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
					creep.moveTo(Game.spawns["Spawn1"]);
					//console.log("not in range of spawn");
				}
			} else {
				//console.log("plenty of energy");
				if (creep.repair(needsWork[0]) === ERR_NOT_IN_RANGE) {
					creep.moveTo(needsWork[0]);
					//console.log("not in range, moving to needsWork");
				} else {
					console.log("in range, building");
					creep.repair(needsWork[0]);
				}
			}
		} else if (creep.carry.energy <= 1) {
			//console.log("creep.carry.energy < creep.carryCapacity");
			var sources = Game.spawns["Spawn1"];
			if (sources.transferEnergy(creep) == ERR_NOT_IN_RANGE) {
				creep.moveTo(sources);
			}
		} else {
			var sites = creep.room.find(FIND_MY_CONSTRUCTION_SITES);

			var closeSite = creep.pos.findClosestByPath(sites);

			if (creep.build(closeSite) === ERR_NOT_IN_RANGE) {
				creep.moveTo(closeSite);
			} else {
				creep.build(closeSite);
			}
		}
	}
};
