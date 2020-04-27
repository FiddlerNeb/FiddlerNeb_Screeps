/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('bodytypes.Harvesters');
 * mod.thing == 'a thing'; // true
 */


const creepBodysHarvesters = {
    smallHCreep: { body:[WORK, CARRY, MOVE]},
    med1HCreep: { body:[WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE]},
    bigHCreep: { body:[WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE]}
}

module.exports = creepBodysHarvesters;