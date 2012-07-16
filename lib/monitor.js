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
    runSetCommand(key, data, client);
    runGetCommand(key, client, function(err, result) {
      if (err) {
        console.log(new Error(err));
        process.exit(1);
      }
      if (result == data) {
        process.exit(0);
      }
    });
  } else if (command == 'get') {
    runGetCommand(key, client, function(err, response) {
      console.log('');   
      console.log('Value for key ' + key + ' = ' +response);
      process.exit(0);
    });
  }
}

var runSetCommand = function(key, data, client) {
  client.set(key, data, redis.print);
}

var runGetCommand = function(key, client, cb) {

  client.get(key, function(err, result) {
    if (err) {
      return cb(new Error(err));
    }
    return cb(null, result);
  })
}

// Function that checks if input is valid, if not, process exit
var isValid = function(host, port, command, key, data, timeout) {
  if(host == undefined) {
    console.log('');
    console.log('redis_mon requires a host to connect');
    help.smallHelp();
  }
  else if(port == undefined) {
    console.log('');
    console.log('redis_mon requires a port to connect');
    help.smallHelp();
  }
  else if(command == undefined) {
    console.log('');
    console.log('redis_mon requires a command to do a set or get (-c set/get or -s/-g)');
    help.smallHelp();
  } 
  else if(key == undefined) {
    console.log('');
    console.log('redis_mon requires a key to set or get a value');
    help.smallHelp();
  }
  else if(data == undefined && key == 'set') {
    console.log('');
    console.log('redis_mon requires data in order to set a key/value');
    help.smallHelp();
  }
  else if(timeout == undefined) {
    console.log('');
    console.log('redis_mon requires a timeout to be set, e.g., -t 5, for 5 seconds');
    help.smallHelp();
  } else {
    return true;
  }
  process.exit(1);
}

// Function that sets a timeout
var setTout= function(timeout) {
  console.log(timeout);
  setTimeout(function() {
    console.log('Timeout after ' + timeout/1000 + 's. Terminating program due to no Response from Server');
    process.exit(1);
  }, timeout);
}

