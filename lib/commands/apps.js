var config = require('../config');
var cli = require('cli');
var request = require('request');
var Table = require('cli-table');

function apps (commands, options) {
    var target = options.target ? options.target : config.getTarget();
    var tokenFile = options['token-file'] ? options['token-file'] : undefined;

    var token = config.getToken(target, tokenFile);

    if (!token) {
        cli.error('Login Required');
        cli.error('Please use \'stackato login\'');
    } else {
        var requestOptions = {
            url: target + '/apps',
            headers: {
                Authorization: token
            }
        }

        if (options.group) {
            requestOptions.headers['X-Stackato-Group'] = options.group;
        }

        request(requestOptions, function (err, data, body) {
            if (err) { throw err; }

            if (data.statusCode !== 200) {
                cli.error('Login Required');
                cli.error('Please use \'stackato login\'');
            } else {
                var apps = JSON.parse(body);
                if (apps.length > 0) {
                    console.log(formatApps(JSON.parse(body)));
                } else {
                    console.log('No applications.');
                }
            }
        });
    }
}

function formatApps (apps) {
    var table = new Table({
        head: ['Application', '#', 'Health', 'URLS', 'Services', 'Drains']
    });

    apps.forEach(function(app) {
        var services = app.services.join('\n');
        var urls = app.uris.join('\n');
        table.push([app.name, app.instances, app.runningInstances / app.instances, urls, services, '']); // TODO -- where are drains?
    });

    return table.toString();
}

module.exports = apps;