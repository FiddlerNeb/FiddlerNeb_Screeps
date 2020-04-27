/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('manage.creeps');
 * mod.thing == 'a thing'; // true
 */

var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
//var roletower = require('role.tower');

var manageCreeps = {

/** @param {Creeps} creeps **/
    run: function(creeps)
    {
        for(var name in creeps)
        {
            switch (creeps[name].memory.role)
            {
                case 'harvester':
                {
                    roleHarvester.run(creeps[name]);
                    break;
                }
                case 'upgrader':
                {
                    roleUpgrader.run(creeps[name]);
                    break;
                }
                case 'builder':
                {
                    roleBuilder.run(creeps[name]);
                    break;
                }
                default:
                    console.log('ERROR: Unknown mancreeps role: ' + creeps[name].memory.role);
                    break;
            }
        }
    }
};

module.exports = manageCreeps;
