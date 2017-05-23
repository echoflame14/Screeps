module.exports = {
	run: function (creep) {
		var needsWork = [];
		var structures = creep.room.find(FIND_STRUCTURES);
		for (let a in structures) {
			if (structures[a].hits < structures[a].hitsMax) {
				needsWork.push(structures[a]);
			}
		}

		//   	needsWork.sort((x,y) => x.hits - y.hits);
		if (needsWork[0] !== undefined) {
			//console.log(needsWork[0], ": needs work! ", creep, "moving to bulid now");
			if (creep.carry.energy < creep.carryCapacity) {
				//console.log("not enough energy");

				if (creep.withdraw(Game.spawns["Spawn1"], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
					creep.moveTo(Game.spawns["Spawn1"]);

					//console.log("not in range of spawn");
				}
			} else {
				if (creep.repair(needsWork[0]) === ERR_NOT_IN_RANGE) {

					//console.log(needsWork[0], "Needs work");
					creep.moveTo(needsWork[0]);
					//console.log("needsWork[0].assigned == ", needsWork[0].assigned);
					//console.log("not in range, moving to needsWork");


				} else {
					creep.repair(needsWork[0]);
					//console.log("in range, building");
				}
			}
		} else if (creep.carry.energy <= 1) {
			//console.log("creep.carry.energy < creep.carryCapacity");
			let sources = Game.spawns["Spawn1"];
			if (sources.transferEnergy(creep) == ERR_NOT_IN_RANGE) {
				creep.moveTo(sources);
			}
		} else {
			//console.log("got here boiz");
			let sites = creep.room.find(FIND_MY_CONSTRUCTION_SITES);
			let roads = [];
			let sortedSites = [];
			for (let site in sites) {
				if (sites[site].structureType === "road") {
					roads.push(sites[site]);
				} else {
					sortedSites.push(sites[site]);
				}

			}
			let closeSite;
			//console.log("Roads = ", roads);
			if (roads[0] !== undefined) {
				//console.log("there are roads");
				closeSite = creep.pos.findClosestByPath(roads);

				//console.log("There are roads, going to them first");
			} else {
				//console.log("There are no roads");
				closeSite = creep.pos.findClosestByPath(sortedSites);
			}
			//console.log(closeSite, "closeSite");


			if (creep.build(closeSite) === ERR_NOT_IN_RANGE) {
				creep.moveTo(closeSite);
			} else {
				creep.build(closeSite);
			}
		}
	}
};
