#!/usr/bin/env node
var cli = require('cli');

var stackato = require('./lib');

cli.parse({
    "nostart": [false, 'If specified do not start the pushed application.'],
    "no-start": [false, 'Alias of --nostart'],
    "allow-http": [false, 'Required to prevent rejection of http urls.'],
    "target": [false, 'Target server to use for this command, instead of configured default.', 'url'],
    "token-file": [false, 'File with login tokens to use.', 'path'],
    "group": [false, 'Group to use for this command, instead of default.', 'string']
});


cli.main(function (commands, options) {
    var command = commands[0];

    if (stackato.commands.hasOwnProperty(command)) {
        stackato.commands[command](commands, options);
    }
});