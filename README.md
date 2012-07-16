REDIS_MON
========+

> Node redis cache set/get testing tool with timeout

redis_mon is short for redis monitor, a Node.js tool for testing redis cache.

Installing
----------

To install/use redis_mon you will have to clone the github repository and do an npm install (node package manager) : https://github.com/isaacs/npm/

Alternatively, we can .tar the files for you.

Usage
-----

redis_mon should be easy to use.
Type 'node redis_mon' into the terminal and it shall give you some help.

To print out some program help, type :

node redis_mon -help 
or
node redis_mon --help

An example use of this would be to type :

node redis_mon -h 127.0.0.1 -p 6379 -s -k testKey -d testData -t 5

This will set a 'testData' value to the key 'testKey' on the redis server at 127.0.0.1 port 6379, with a 5 second timeout.

