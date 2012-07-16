var commands = require('./commands');
var helpText = require('./helpText');

// Function used to output example redis_mon use
var smallHelp = function() {
  console.log('');
  console.log('Example of how to use redis_mon to set a key/value pair');
  console.log('node redis_mon -h 127.0.0.1 -p 6379 -k testKey -d testData -s"');
  console.log('');
}

// Outputs a command error on a given command and a list of possible commands
var commandError = function(command) {
  console.log('');
  console.log('Command %s is not a redis_mon command', command);
  console.log('Possible commands are hyphen (-) ' + commands);
}

// Provides a readable output about redis_mon and how to use it
var programHelp = function() {
console.log('test3');

  for(s in helpText) {
    console.log(s + ' : ' + helpText[s]);
  }
console.log('test2');

}

exports.smallHelp = smallHelp;
exports.commandError = commandError;
exports.programHelp = programHelp;


