var roleUpgrader = require('role.upgrader.js');
module.exports = {
    run: function(creep){




        var closeSource = creep.pos.findClosestByPath(FIND_SOURCES);
        //console.log(closeSource, "<------- closeSource.");
        var spawnTarget = creep.pos.findClosestByPath(FIND_MY_SPAWNS);
        //console.log("SpawnTarget = ", spawnTarget.name);
        spawnTarget = spawnTarget.name;
        var closeSpawn = Game.spawns[spawnTarget];
        //console.log("Game.spawns[spawnTarget] = ", Game.spawns[spawnTarget]);
        var mem = creep.memory;

        if(closeSpawn.energy === 300){
            roleUpgrader.run(creep);
        }
        else{
            creep.memory.role = "harvester";

            if(creep.carry.energy === creep.carryCapacity){
                // console.log("creep.carry.energy === creep.carryCapacity");
                // console.log("running creep.transfer(closeSpawn) gives this response ->", creep.transfer(closeSpawn));
                if(Game.spawns[closeSpawn].energy <= (300 - creep.carryCapacity)){
                     if(creep.transfer(closeSpawn, RESOURCE_ENERGY, creep.carry.energy) === ERR_NOT_IN_RANGE){
                        //console.log("Creep.transfer(", closeSpawn,") === ERR_NOT_IN_RANGE");
                        creep.moveTo(closeSpawn);
                        mem.mining = false;
                        mem.transfering = false;
                        mem.moving = true;
                    }
                    else{
                        creep.transfer(closeSpawn, RESOURCE_ENERGY, creep.carry.energy);
                    }
                }




            }
            else if(creep.carry.energy < creep.carryCapacity){
                //console.log("creep.carry.energy < creep.carryCapacity");
                if(creep.harvest(closeSource) === ERR_NOT_IN_RANGE){
                    //console.log("creep.harvest(closeSource) === ERR_NOT_IN_RANGE");
                    creep.moveTo(closeSource);
                    mem.mining = false;
                    mem.transfering = false;
                    mem.moving = true;
                }
                else{
                    //console.log("creep.carry.energy is not < and is not === to creep.carrycapacity");
                    mem.transfering = false;
                    mem.moving = false;
                    mem.mining = true;
                }

            }
        }


    }
};
