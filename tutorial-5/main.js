var manageCreeps = require('manage.creeps');
var manageSpawns = require('manage.spawners');
var utils = require('utilities');

const maxHcount = 3;
const smallCreepSize = 3;
const med1CreepSize = 11;
const largeCreepSize = 22;
const slowFuncCountPeriod = 0;//TODO this shouldn't be 0 but the loop counter shouldn't be rolling over

var currHcount = 0;
var sizeToSpawn = smallCreepSize;
var roleToSpawn = 'none';
var desiredSize = smallCreepSize;
var loopCounter = 0;//TODO this shouldn't be rolling over
var lastCountRanSlowFunc = 6;

//TODO: this should count up spawn cost of the creep rather than just counting the body parts
function checkNeedSuicide(creeps, currCount, maxCount, roleName, desiredSize)
{
    var smallestCreepOfRole = 0;
    
    if (currHcount >= ( maxCount ))
    {
        for(var name in creeps)
        {
            if (typeof(creeps[name]) != "undefined")
            {
                if ((creeps[name].memory.role == roleName ) && ( creeps[name].body.length < desiredSize ))
                {
                    if ((smallestCreepOfRole == 0) || ( smallestCreepOfRole.body.length < creeps[name].body.length))
                    {
                        smallestCreepOfRole = creeps[name];
                    }
                    else
                    {
                        //not smaller than current smallest
                    }
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


module.exports.loop = function () 
{
    //make decisions
    roleToSpawn = 'harvester';
    //sizeToSpawn = smallCreepSize;
    currHcount = utils.calcNumCreepsWithRole(Game.creeps, roleToSpawn);
    
    if ( currHcount == maxHcount)
    {
        if (sizeToSpawn == smallCreepSize)
        {
            desiredSize = med1CreepSize;
        }
        else if (sizeToSpawn == med1CreepSize)
        {
            desiredSize = largeCreepSize;
        }
        else
        {
            //TODO: expand number of sizes on a per role basis
        }
    }
    else if (currHcount < maxHcount)
    {
        sizeToSpawn = desiredSize;
    }
    
    manageSpawns.run(Game.spawns, currHcount, maxHcount, roleToSpawn, sizeToSpawn);
    
    //run manage functions
    manageCreeps.run(Game.creeps);
    
    if (loopCounter > (lastCountRanSlowFunc + slowFuncCountPeriod))
    {
        console.log('runnin slow functions');
        checkNeedSuicide(Game.creeps, currHcount, maxHcount, roleToSpawn, desiredSize);
        lastCountRanSlowFunc = loopCounter;
    }
    console.log(loopCounter);
    ++loopCounter;
}

