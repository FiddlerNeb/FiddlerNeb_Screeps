/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('manage.spawners');
 * mod.thing == 'a thing'; // true
 */
var cons = require ('constants');
var utils = require('utilities');
var creepBodys = require ('CreepTable');
//const smallCreepValue = { body:[WORK, CARRY, MOVE]};
//const med1Creep = { body:[WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE]};
//const bigCreep = { body:[WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE]};

var ret_code = 0;


function chooseNextSpawn( roleToSpawn, percEnPerSpawn, energyCap )
{
    var desiredEnergyPerSpawnTarget = ((energyCap * percEnPerSpawn) / 100);
    var bodyToSpawn;
    var bodyList = creepBodys[roleToSpawn];

    for (var bodyName in bodyList)
    {
        if (utils.calcCreepCost(bodyList[bodyName]) < desiredEnergyPerSpawnTarget)
        {
            bodyToSpawn = creepBodys[bodyName];
        }
    }

    return bodyToSpawn;
}

var manageSpawners = {

    creepValues: creepBodys.smallHCreep,
    creepCost: 0,
    //unitCounter: 0,

    run: function(spawns, creeps, currCount, maxCount, roleToSpawn, percEnPerSpawn)
    {
        for(var x in spawns)
        {
          //TODO: finish implementing spawn request by cost rather than by size
          creepValues = chooseNextSpawn( roleToSpawn, percEnPerSpawn, spawn[x].energycapacity)
          this.creepCost = utils.calcCreepCost(this.creepValues);

          //console.log(`spawn ${x} has ${spawns[x].energy} energy and creepCost is ${ this.creepCost}`);
          if (( spawns[x].spawning == null ) && (spawns[x].energy >= this.creepCost) && ( currCount < maxCount))
          {
            console.log(`${currCount}/${maxCount} ${roleNameHarvester}'s exist`);
              //console.log(`spawn ${x} is spawning a ${this.creepCost} cost ${this.prioritySpawnCreep}`);
              switch(roleToSpawn)
              {
                  case roleNameHarvester:
                  {
                      ret_code = spawns[x].spawnCreep(this.creepValues.body, (cons.roleNameHarvester + (currCount++)), { memory: {role: cons.roleNameHarvester, spawnCost: this.creepCost } });
                      //console.log(`spawn ${x} returned ${ret_code}`);
                      if (ret_code == 0)
                      {
                          //all good
                          console.log(`${x} is spawning ${this.creepCost} cost harvester named ${cons.roleNameHarvester}${(currCount - 1)}`);
                      }
                      else if (ret_code == -3)
                      {
                          ret_code = spawns[x].spawnCreep(this.creepValues.body, (cons.roleNameHarvester + (currCount+10)), { memory: {role: cons.roleNameHarvester, spawnCost: this.creepCost} });
                      }
                      else
                      {
                          console.log(`ERROR: spawn H${(currCount)} at ${x} failed with code ${ret_code}`);
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
            console.log(`looking for creeps to recycle...`);
            var creepsWithRoleInRange = _.filter(creeps, (creep) => (( creep.memory.role == roleToSpawn ) &&
                                                                     ( utils.distanceBetweenPointsInRoom( creep.pos, spawns[x].pos ) >= 0 ) && // if >=0 creep is in room
                                                                     ( utils.distanceBetweenPointsInRoom( creep.pos, spawns[x].pos ) < 2 ))); //if distance is less than 2 then is adjacent
            var creepsWithRoleInRangeNCheaper = _.filter(creepsWithRoleInRange, (creep) => ( creep.memory.spawnCost < this.creepCost ));
            console.log(`cheaper array: ${creepsWithRoleInRangeNCheaper}, cost is ${this.creepCost}`);
            for (var name in creepsWithRoleInRange)
            {
              if ( typeof (creepsWithRoleInRangeNCheaper[name]) != "undefined")
              {
                console.log(`recycling creep`);
                ret_code = spawns[x].recycleCreep(creepsWithRoleInRangeNCheaper[name]);
                if ( ret_code != 0)
                {
                  console.log(`recycle creep returned ${ret_code}`);
                }
              }
              else if ( creepsWithRoleInRange[name].ticksToLive < cons.ticksRemainingNeedsRenew )
              {
                ret_code = spawns[x].renewCreep(creepsWithRoleInRange[name]);
                if ( ret_code != 0)
                {
                  console.log(`renew creep returned ${ret_code}`);
                }
              }
              else
              {
                  //do nothing
              }
            }
          }
        }
    }
};

module.exports = manageSpawners;
