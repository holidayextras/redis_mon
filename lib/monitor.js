var redis = require('redis');
var help = require('./howto');
var util = require('util');
var getClient = function(host, port) {
  return redis.createClient(port, host);
}

module.exports = function(host, port, command, key, data, timeout) {
  
  // Runs function to check for valid input, program exit if not valid
  isValid(host, port, command, key, data, timeout);
  setTout(timeout);
  client = getClient(host, port);

  if (command == 'set') {
    runSetCommand(key, data, client, function(err, result) { 
      if(err) {        
        console.log('\n' + err);
        process.exit(1);
      } 
      if(result) {
        process.exit(0); 
      }
    });
  } else if (command == 'get') {
    runGetCommand(key, client, function(err, response) {
      if(err) {
        console.log('\n' + err);
        process.exit(1); 
      } 
      console.log('\nValue for key ' + key + ' = ' +response);
      process.exit(0);
    });
  } else {
    // The program should never be able to reach this point.
    console.log('\nCommand given to redis_mon not recognised, not a set or get');
    process.exit(1);
  }
}

var runSetCommand = function(key, data, client, cb) {
  client.set(key, data, redis.print);

  // This is needed to make certain set is complete before exiting program
  runGetCommand(key, client, function(err, result) {
    if (err) {
      return cb(err); 
    }
    if (result == data) {
      console.log(result + ' assigned to key ' + key);
      return cb(null, result);
    }
  });
}

var runGetCommand = function(key, client, cb) {
  client.get(key, function(err, result) {
    if (err) {
      return cb(new Error(err));
    }
    return cb(null, result);
  });
}

// Function that checks if input is valid, if not, process exit
var isValid = function(host, port, command, key, data, timeout) {
  if(host == undefined) {
    console.log('\nredis_mon requires a host to connect');
    help.smallHelp();
  }
  else if(port == undefined) {
    console.log('\nredis_mon requires a port to connect');
    help.smallHelp();
  }
  else if(command == undefined) {
    console.log('\nredis_mon requires a command to do a set or get (-c set/get or -s/-g)');
    help.smallHelp();
  } 
  else if(key == undefined) {
    console.log('\nredis_mon requires a key to set or get a value, e.g., -k testKey');
    help.smallHelp();
  }
  else if(data == undefined && command == 'set') {
    console.log('\nredis_mon requires data in order to set a key/value');
    help.smallHelp();
  }
  else if(timeout == undefined) {
    console.log('\nredis_mon requires a timeout to be set, e.g., -t 5, for 5 seconds');
    help.smallHelp();
  } else {
    return true;
  }
  process.exit(1);
}

// Function that sets a timeout
var setTout= function(timeout) {
  setTimeout(function() {
    console.log('\nTimeout after ' + timeout/1000 + 's. Terminating program due to no Response from Server');
    process.exit(1);
  }, timeout);
}

