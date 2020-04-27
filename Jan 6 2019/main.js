var manageCreeps = require('manage.creeps');
var manageSpawns = require('manage.spawners');
var cons = require ('constants');
var utils = require('utilities');
var creepBodys = require ('CreepTable');

//var sizeToSpawn = cons.smallCreepSize;
//var desiredSize = cons.smallCreepSize;
var currHcount = 0;
var roleToSpawn = 'none';
var loopCounter = 0;//TODO this shouldn't be rolling over
var lastCountRanSlowFunc = 6;

/*
//TODO: this should count up spawn cost of the creep rather than just counting the body parts
function checkNeedSuicide(creeps, currCount, maxCount, roleName, desiredSize, desiredCost)
{
    var smallestCreepOfRole = 0;
    var creepsOfRole;

    if (currHcount >= ( maxCount ))
    {
      creepsOfRole = _.filter(creeps, (creep) => creep.memory.role == roleName);

        for(var name in creepsOfRole)
        {

            if (typeof(creeps[name]) != "undefined")
            {
              //
              //  if ( creeps[name].body.length < desiredSize )
             //   {
              //      if ((smallestCreepOfRole == 0) || ( smallestCreepOfRole.body.length < creeps[name].body.length))
            //        {
                //        smallestCreepOfRole = creeps[name];
                //    }
              //      else
            //        {
                  //      //not smaller than current smallest
                //    }
              //  }
              //

              if ( utils.calcCreepCost(creeps[name].body) < desiredCost)
              {

              }
              else
              {
                  //next
              }
            }
        }

        if (smallestCreepOfRole != 0)
        {
            smallestCreepOfRole.suicide();
        }
    }
    else
    {
        //all good
    }
}
*/

module.exports.loop = function ()
{
    //make decisions
    roleToSpawn = roleNameHarvester;//'harvester';
    //sizeToSpawn = smallCreepSize;
    currHcount = utils.calcNumCreepsWithRole(Game.creeps, roleToSpawn);

    var costToSpawn

    manageSpawns.run(Game.spawns, Game.creeps, currHcount, maxHcount, roleToSpawn, costToSpawn);

    //run manage functions
    manageCreeps.run(Game.creeps);

    if (loopCounter > (lastCountRanSlowFunc + slowFuncCountPeriod))
    {
        console.log('running slow functions');
        //checkNeedSuicide(Game.creeps, currHcount, maxHcount, roleToSpawn, desiredSize);
        lastCountRanSlowFunc = loopCounter;
    }
    console.log(loopCounter);
    ++loopCounter;
}
