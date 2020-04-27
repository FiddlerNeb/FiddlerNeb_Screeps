/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('utilities');
 * mod.thing == 'a thing'; // true
 */

var utils = {
    /*
    calcCreepCost: function ( numMove, numWork, numCarry, numAttack, numRangedAttack, numHeal, numTough, numClaim)
    {
        return (( numMove * 50 ) + ( numWork * 100 ) + ( numCarry * 50 ) + ( numAttack * 80 ) + ( numRangedAttack * 150 ) + ( numHeal * 250 ) + ( numTough * 10 ) + ( numClaim * 600 ));
    }
    */
    calcCreepCost: function(CreepValue) {

        var creepCost = 0;

        for(var index in CreepValue.body)
        {
            //console.log(CreepValue.body[index]);
            switch(CreepValue.body[index])
            {
                case 'MOVE':
                case 'move':
                case 'CARRY':
                case 'carry':
                {
                    creepCost += 50;
                    break;
                }
                case 'WORK':
                case 'work':
                {
                    creepCost += 100;
                    break;
                }
                case 'ATTACK':
                case 'attack':
                {
                    creepCost += 80;
                    break;
                }
                case 'RANGED_ATTACK':
                case 'ranged_attack':
                {
                    creepCost += 150;
                    break;
                }
                case 'HEAL':
                case 'heal':
                {
                    creepCost += 250;
                    break;
                }
                case 'TOUGH':
                case 'tough':
                {
                    creepCost += 10;
                    break;
                }
                case 'CLAIM':
                case 'claim':
                {
                    creepCost += 600;
                    break;
                }

                default:
                    console.log('Error ' + CreepValue[index] + 'isnt recognised');
                    break;
            }
        }

        return creepCost;
    },

    calcNumCreepsWithRole: function (creeps, desiredRoleName)
    {
        var numCreeps = 0;
        /*
        for(var name in creeps)
        {
            //console.log('role: '+ creeps[name].memory.role +'desired: '+ desiredRoleName);
            if (creeps[name].memory.role == desiredRoleName)
                ++numCreeps;
        }
        */
        var creepsWithRole = _.filter(creeps, (creep) => creep.memory.role == desiredRoleName);
        numCreeps = creepsWithRole.length;

        return numCreeps;
    },

    distanceBetweenPointsInRoom: function ( pos1, pos2 )
    {
      var distance = -1;

      if ( pos1.roomName == pos2.roomName )
      {
          distance = Math.sqrt(Math.pow(Math.abs( pos1.x - pos2.x ),2 ) + Math.pow(Math.abs( pos1.y - pos2.y ),2));
      }

      return distance;
    }

};

module.exports = utils;
