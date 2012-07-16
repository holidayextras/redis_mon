var redis_mon = require('../monitor');
var vows = require('vows');
var assert = require('assert');

var redisMonCommands = function() {
  return {
    'Run a set command through redis_mon' : {
      topic: function() {
        redis_mon('127.0.0.1', '6379', 'set', 'key', 'value');
        return 'OK';
      },
      'Check set has worked by running the get command' : function(err, data) {
        console.log(data);
        redis_mon('127.0.0.1', '6379', 'get', 'key');
      }
    }
  }
}

var suite = vows.describe('Running redis_mon monitor.js tests');
suite.addBatch(redisMonCommands());
suite.export(module);