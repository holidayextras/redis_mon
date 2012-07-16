var redis = require('redis');
var help = require('./howto');
var util = require('util');
var getClient = function(host, port) {
  return redis.createClient(port, host);
}
var timeout;


module.exports = function(host, port, command, key, data, timeout) {
 // console.log(timeout);
  console.log(this.timeout + ' s ');
  
  // Runs function to check for valid input, program exit if not valid
  isValid(host, port, command, key, data);

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
      console.log(response);
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
var isValid = function(host, port, command, key, data) {
  if(host == undefined) {
    console.log('redis_mon requires a host to connect');
    help.howTo();
  }
  else if(port == undefined) {
    console.log('redis_mon requires a port to connect');
    help.howTo();
  }
  else if(command == undefined) {
    console.log('redis_mon requires a command to do a set or get (-c set/get or -s/-g)');
    help.howTo();
  } 
  else if(key == undefined) {
    console.log('redis_mon requires a key to set or get a value');
    help.howTo();
  }
  else if(data == undefined && key == 'set') {
    console.log('redis_mon requires data in order to set a key/value');
    help.howTo();
  } else {
    return true;
  }
  process.exit(1);
}

setTimeout(function() {
  console.log('Timeout after 5s. Terminating program due to no Response from Server');
  process.exit(1);
}, 5000);

