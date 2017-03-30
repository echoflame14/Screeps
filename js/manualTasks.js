module.exports = {
    spawnH: function(){
        Game.spawns["Spawn1"].createCreep([WORK,CARRY,MOVE,MOVE], undefined, {role: 'harvester'});
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
