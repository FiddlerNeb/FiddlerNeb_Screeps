/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('constants');
 * mod.thing == 'a thing'; // true
 */
 
const cons = {
    maxHcount:              3,
    //smallCreepSize:         3,
    //med1CreepSize:          11,
    //largeCreepSize:         22,
    slowFuncCountPeriod:    0,//TODO this shouldn't be 0 but the loop counter shouldn't be rolling over
    roleNameHarvester:      'Harvester',
    roleNameBuilder:        'Builder',
    roleNameUpgrader:       'Upgrader',
    ticksRemainingNeedsRenew: 10,
   
}

module.exports = cons;