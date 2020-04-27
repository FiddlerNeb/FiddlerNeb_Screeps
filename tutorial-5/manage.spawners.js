/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('manage.spawners');
 * mod.thing == 'a thing'; // true
 */
var utils = require('utilities');

const smallCreepValue = [WORK, CARRY, MOVE];
const med1Creep = [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE];
const bigCreep = [WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE];

var ret_code = 0;

var manageSpawners = {

    creepValues: smallCreepValue,
    creepCost: 0,
    //unitCounter: 0,

    run: function(spawns, currCount, maxCount, roleToSpawn, sizeToSpawn)
    {
        //TODO: currently sizeToSpawn counts body parts rather than creep cost
        if ( sizeToSpawn == 3)
        {
            this.creepValues = smallCreepValue;
        }
        else if ( sizeToSpawn == 11)
        {
            this.creepValues = med1Creep;
        }
        else if ( sizeToSpawn == 22)
        {
            this.creepValues = bigCreep;
        }
        else
        {
            //leave it where it was
        }
        
        
        this.creepCost = utils.calcCreepCost(this.creepValues);
        for(var x in spawns)
        {
            //console.log(`spawn ${x} has ${spawns[x].energy} energy and creepCost is ${ this.creepCost}`);
            if (( spawns[x].spawning == null ) && (spawns[x].energy >= this.creepCost))
            {
                //console.log(`spawn ${x} is spawning a ${this.creepCost} cost ${this.prioritySpawnCreep}`);
                switch(roleToSpawn)
                {
                    case 'harvester':
                    {
                        console.log(`${currCount}/${maxCount} harvesters exist`);
                        if ( currCount < maxCount)
                        {
                            ret_code = spawns[x].spawnCreep(this.creepValues, ('H' + (currCount++)), { memory: {role: 'harvester'} });
                            //console.log(`spawn ${x} returned ${ret_code}`);
                            if (ret_code == 0)
                            {
                                //all good
                                console.log(`${x} is spawning ${this.creepCost} cost harvester named H${(currCount - 1)}`);
                            }
                            else if (ret_code == -3)
                            {
                                ret_code = spawns[x].spawnCreep(this.creepValues, ('H' + (currCount+10)), { memory: {role: 'harvester'} });
                            }
                            else
                            {
                                console.log(`ERROR: spawn H${(currCount)} at ${x} failed with code ${ret_code}`);
                            }
                            break;
                        }
                        else
                        {
                            //do nothing
                        }
                        break;
                    }
                    default:
                        console.log(`role ${roleToSpawn} not recognized`);
                        break;
                }
            }
            else
            {
                //do nothing
            }
        }
    }
};

module.exports = manageSpawners;
