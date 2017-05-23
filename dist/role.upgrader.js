var roleUpgrader = {

	/** @param {Creep} creep **/
	run: function (creep) {
		creep.memory.role = "upgrader";

		var closeSpawn = creep.pos.findClosestByPath(FIND_MY_SPAWNS);
		//console.log(closeSpawn, "<------- closeSpawn.");
		var upgradeTarget = creep.room.controller;
		//console.log("SpawnTarget = ", spawnTarget.name);
		storeTarget = creep.room.find(FIND_STRUCTURES, {
			filter: (structure) => {
				return (structure.structureType == STRUCTURE_EXTENSION) &&
					structure.energy > 0;
			}
		});
		storeTarget = _.sortBy(storeTarget, a => creep.pos.getRangeTo(a));
		storeTarget = storeTarget[0];

		//console.log("Game.spawns[spawnTarget] = ", Game.spawns[spawnTarget]);
		var mem = creep.memory;

		if (creep.carry.energy > 0) {
			if (creep.upgradeController(upgradeTarget) === ERR_NOT_IN_RANGE) {
				creep.moveTo(upgradeTarget);
			}
		} else if (creep.carry.energy === 0) {
			console.log(creep, " is trying to get energy from ", storeTarget);
			if (creep.withdraw(storeTarget, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
				console.log("transfering energy from, ", storeTarget);
				creep.moveTo(storeTarget);
			}
		}
	}

};

module.exports = roleUpgrader;
