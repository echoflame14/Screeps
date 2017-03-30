module.exports = {
    run: function(creep){
        //console.log("running builder.run");
         if(creep.carry.energy <= 1) {
            //console.log("creep.carry.energy < creep.carryCapacity");
            var sources = Game.spawns["Spawn1"];
            if(sources.transferEnergy(creep) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources);
            }
        }
        else{
            var sites = creep.room.find(FIND_MY_CONSTRUCTION_SITES);

            var closeSite = creep.pos.findClosestByPath(sites);

            if(creep.build(closeSite) === ERR_NOT_IN_RANGE){
                creep.moveTo(closeSite);
            }
            else{
                creep.build(closeSite);
            }

            // for(var i = 0; i < sites.length; i++){
            //     if(sites[i].progress < 30){
            //         if(creep.build(sites[i] === ERR_NOT_IN_RANGE)){
            //             creep.moveTo(sites[i]);
            //             creep.build(sites[i]);
            //         }
            //         else{
            //             creep.build(sites[i]);
            //         }
            //         break;
            //     }
            // }

        }
    }
};
