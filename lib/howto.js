var commands = require('./commands');
var helpText = require('./helpText');

// Function used to output example redis_mon use
var smallHelp = function() {
  console.log('');
  console.log('Example of how to use redis_mon to set a key/value pair');
  console.log('node redis_mon -h 127.0.0.1 -p 6379 -k testKey -d testData -s -t 5');
}

// Outputs a command error on a given command and a list of possible commands
var commandError = function(command) {
  console.log('');
  console.log('Command %s is not a redis_mon command', command);
  console.log('Possible commands are hyphen (-) ' + commands);
}

// Provides a readable output about redis_mon and how to use it
var programHelp = function() {
  console.log('');
  for(s in helpText) {
    console.log(s + ' : ' + helpText[s]);
  }
}

// Error message when multiple action commands get used (e.g., -s and -g ). 
var multiAction = function() {
  console.log('');
  console.log('Multiple action commands have been sent to redis_mon');
  console.log('Please either use -c set, -c get, -s (for set) or -g (for get)');
}

exports.multiAction = multiAction;
exports.smallHelp = smallHelp;
exports.commandError = commandError;
exports.programHelp = programHelp;


