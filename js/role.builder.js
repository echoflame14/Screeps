/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.builder');
 * mod.thing == 'a thing'; // true
 */

module.exports = {
    run: function(creep){
        // console.log("running builder.run");
        //  if(creep.carry.energy < creep.carryCapacity) {
        //     console.log("creep.carry.energy < creep.carryCapacity");
        //     var sources = Game.spawns["Spawn1"];
        //     if(sources.transferEnergy(creep) == ERR_NOT_IN_RANGE) {
        //         creep.moveTo(sources);
        //     }
        // }
        // else{
        //     var sites = creep.room.find(FIND_MY_CONSTRUCTION_SITES);
        //     for(var i = 0; i < sites.length; i++){
        //         if(sites[i].progress < 30){
        //             if(creep.build(sites[i] === ERR_NOT_IN_RANGE)){
        //                 creep.moveTo(sites[i]);
        //                 creep.build(sites[i]);
        //             }
        //             else{
        //                 creep.build(sites[i]);
        //             }
        //             break;
        //         }
        //     }

        // }
    }
};
