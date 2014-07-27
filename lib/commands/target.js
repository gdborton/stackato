var cli = require('cli');
var config = require('../config');

var target = function (commands, options) {
    if (commands.length > 1) {
        if (!isValidUrl(commands[1], options['allow-http'])) {
            cli.error(commands[1] + ' is not a valid url.\n');
        } else {
            config.setTarget(commands[1]);
            cli.ok('Successfully targeted to ' + config.getTarget());
        }
    } else {
        console.log(config.getTarget());
    }
};

function isValidUrl (url, allowHTTP) {
    var regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
    var regexSecure = /https:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;

    if (allowHTTP) {
        return regex.test(url);
    } else {
        return regexSecure.test(url);
    }
}

module.exports = target;