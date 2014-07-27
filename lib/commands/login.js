var config = require('../config');
var request = require('request');
var inquirer = require('inquirer');
var cli = require('cli');

var login = function (commands, options) {
    var target = options.target ? options.target : config.getTarget();

    console.log('Attemping to login to ' + target);
    inquirer.prompt(promptOptions, function (result) {
        var requestOptions = {
            url: target + '/users/' + result.email + '/tokens/',
            body: JSON.stringify({password: result.password}),
            headers: {
                'AUTHORIZATION': 'BASIC Y2Y6',
                'Content-Type': 'application/json'
            }
        };

        request.post(requestOptions, function (err, data, body) {
            if (err) {
                throw err;
            }

            if (data.statusCode !== 200) {
                var parsed = JSON.parse(body);
                cli.error('Problem with login, invalid account or password while attempting to login to \'' + target + '\'. Error ' + parsed.code + ': ' + parsed.description + ' (' + data.statusCode + ')')
            } else {
                data.headers['set-cookie'].forEach(function (cookieEntry) {
                    if (cookieEntry.indexOf('console_auth=') !== -1) {
                        var token = cookieEntry.split('=')[1].split(';')[0];
                        config.setToken({target: target, token: token}, options['token-file'] ? options['token-file'] : undefined);
                        cli.ok('Successfully logged in.');
                    }
                });
            }
        });
    });
};

module.exports = login;

var promptOptions = [
    {
        message: 'Email',
        name: 'email',
        validate: function (input) {
            return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(input);
        }
    },
    {
        type: 'password',
        message: 'Password',
        name: 'password'
    }
];