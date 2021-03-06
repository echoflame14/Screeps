var mt = require('manualTasks');
module.exports = {
    updateTotals: function(){

        var spawnList = Game.spawns;
        var creepList = Game.spawns["Spawn1"].room.find(FIND_MY_CREEPS);
        //console.log(creepList);
        var harvesters = [];
        var builders = [];
        var upgraders = [];

        for(let name in creepList){
            //console.log(creepList[name].memory.role);
            switch(creepList[name].memory.role){
                case "harvester":
                    harvesters.push(creepList[name].memory.role);
                    break;
                case "upgrader":
                    upgraders.push(creepList[name].memory.role);
                    break;
                case "builder":
                    builders.push(creepList[name].memory.role);
                    break;
                default:
                    //console.log("not mine?");
            }
        }
        //console.log("Harvesters.length = ",harvesters.length);
        for(let n in spawnList){
            var spawnN = spawnList[n];
            spawnN.memory.totalHarvesters = harvesters.length;
            spawnN.memory.totalUpgraders = upgraders.length;
            spawnN.memory.totalBuilders = builders.length;
            //console.log(spawnN, ": harvesters = ", spawnN.memory.totalHarvesters);
        }
		if(spawnN.memory.totalHarvesters < 4 && spawnN.memory.totalUpgraders >= 1){
            // console.log("totalHarvester is too low. Spawing another one");
            mt.changeToHarvester(3);

        }

		if(spawnN.memory.totalHarvesters < 14 && spawnN.energy >= 250){
            console.log("totalHarvester is too low. Spawing another one");
            Game.spawns["Spawn1"].createCreep([WORK, MOVE, MOVE, CARRY], undefined, {role: 'harvester'});
        }
        else if(spawnN.memory.totalUpgraders < 3 && spawnN.energy >= 250){
            console.log("totalUpgrader is too low. Spawing another one");
            Game.spawns["Spawn1"].createCreep([WORK, MOVE, MOVE, CARRY], undefined, {role: 'upgrader'});
        }
        else if(spawnN.memory.totalBuilders < 2 && spawnN.memory.totalUpgraders === 1 && spawnN.energy >= 300){
            console.log("totalBuilder is too low. Spawing another one");
            Game.spawns["Spawn1"].createCreep([WORK,WORK,MOVE,CARRY], undefined, {role: 'builder'});
        }



    }
};
