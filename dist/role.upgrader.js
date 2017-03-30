var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
        creep.memory.role = "upgrader";

        var closeSpawn = creep.pos.findClosestByPath(FIND_MY_SPAWNS);
        //console.log(closeSpawn, "<------- closeSpawn.");
        var upgradeTarget = creep.room.controller;
        //console.log("SpawnTarget = ", spawnTarget.name);
        closeSpawn = closeSpawn.name;
        closeSpawn = Game.spawns[closeSpawn];
        //console.log("Game.spawns[spawnTarget] = ", Game.spawns[spawnTarget]);
        var mem = creep.memory;

        if(creep.carry.energy > 0){
            if(creep.upgradeController(upgradeTarget) === ERR_NOT_IN_RANGE){
                creep.moveTo(upgradeTarget);
            }
        }
        else if(creep.carry.energy === 0){
            if(Game.spawns["Spawn1"].transferEnergy(creep, creep.carryCapacity) === ERR_NOT_IN_RANGE){
                creep.moveTo(closeSpawn);
            }
        }
    }

};

module.exports = roleUpgrader;
