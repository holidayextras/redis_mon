var argv = require('optimist').argv;
var commands = require('./commands');
var argvArray = new Array();
var help = require('./howto');
var host;
var port;
var action; // Create undefined variable, will be either set or get
var key;
var data;
var action;
var timeout;

// Function to see if a given command is an available command
var isCommand = function(command) {
  for(x in commands) {
    if(commands[x] == command) {
      return true;
    }
  }
  return false;
}

// Function to set action, if set, error
var setAction = function(act) { 
  if(action == undefined) {
    action = act;
  } else {
    help.multiAtion()
    process.exit(1);
  }
}

// Populate argvArray, optimist library argv array does not have .length property
for(x in argv) {
  argvArray.push(x);
}

// Show help if no commands passed into redis_mon
if(argvArray.length <= 2) {
  help.smallHelp();
  console.log('\nFor more help, type redis_mon --help or -help \n');
  process.exit(1);
}

// See if redis_mon was passed --help
if(argv.help != undefined) {
    help.programHelp();
    process.exit(0);
}

// See if redis_mon was passed -help
if(argvArray[2] == 'h' && argvArray[3] == 'e' && argvArray[4] == 'l' && argvArray[5] == 'p') {
  help.programHelp();
  process.exit(0);
} 

// Start at 2 to skip _ and $0 entries
for(var i = 2; i < argvArray.length; i++) {
  var command = argvArray[i];
  
  if(isCommand(command)) {
    switch(command) {
      case 'h':
        host = argv.h;
        break;
      case 'p':
        port = argv.p;
        break;
      case 'c':
        setAction(argv.c);
        break;
      case 'k':
        key = argv.k;
        break;
      case 'd':
        data = argv.d;
        break;
      case 's':
        setAction('set');
        break;
      case 'g':
        setAction('get');
        break;
      case 't':
        timeout = argv.t * 1000;
        break;
    }
  } else { 
    help.commandError(command);
    help.smallHelp();
    process.exit(1);
  }
}

require('./monitor')(host, port, action, key, data, timeout);
