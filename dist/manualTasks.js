module.exports = {
    spawnX: function(body, type){
		console.log("mt.spawnX run: creating a ", type);
        Game.spawns["Spawn1"].createCreep(body, undefined, {role: type});

    },
    findClose: function(creep){
        //console.log("creep = ", creep);
        var target = creep.pos.findClosestByPath(FIND_SOURCES);
        //console.log(target);
    },
    changeToUpgrader: function(num2Change){

        var count = 0;
        var myCreeps = Game.spawns["Spawn1"].room.find(FIND_MY_CREEPS);
        for(let name in myCreeps){
            var creep = myCreeps[name];
            if(count < num2Change){
                creep.memory.role = "upgrader";
            }
            count++;
        }
    },
	changeToHarvester: function(num2Change){

        var count = 0;
        var myCreeps = Game.spawns["Spawn1"].room.find(FIND_MY_CREEPS);
        for(let name in myCreeps){
            var creep = myCreeps[name];
            if(count < num2Change){
                creep.memory.role = "harvester";
            }
            count++;
        }
    }
};
