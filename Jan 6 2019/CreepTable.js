/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('CreepTable');
 * mod.thing == 'a thing'; // true
 */
var cons = require('constants');
var creepBodysHarvesters = require('bodytypes.Harvesters');
 
const creepBodys = {
    Harvester: creepBodysHarvesters
}

module.exports = creepBodys;