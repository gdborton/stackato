var osenv = require('osenv');
var home = osenv.home();
var fs = require('fs');
var mkdirp = require('mkdirp');
var configHome = home + '/.stackato/client';

var config = {
    setTarget: function (value) {
        if (!fs.existsSync(configHome)) {
            mkdirp.sync(configHome);
        }

        fs.writeFileSync(configHome + '/target', value);
    },
    getTarget: function () {
        if (fs.existsSync(configHome + '/target')) {
            return fs.readFileSync(configHome + '/target', { encoding: 'UTF-8' });
        } else {
            return 'https://api.stackato.local';
        }
    },
    setToken: function (options, tokenFile) {
        var file = tokenFile ? tokenFile : configHome + '/token';
        var value = {};

        if (fs.existsSync(file)) {
            value = JSON.parse(fs.readFileSync(file, { encoding: 'UTF-8' }));
        } else {
            if (file.indexOf('/') !== -1) {
                var structure = file.split('/');
                var path = structure.slice(0, structure.length - 1).join('/');

                if (!fs.existsSync(path)) {
                    mkdirp.sync(path);
                }
            }
        }

        value[options.target] = options.token;
        fs.writeFileSync(file, JSON.stringify(value));
    },
    getToken: function (target, tokenFile) {
        var file = tokenFile ? tokenFile : configHome + '/token';

        if (fs.existsSync(file)) {
            return JSON.parse(fs.readFileSync(file, { encoding: 'UTF-8' }))[target];
        } else {
            return undefined;
        }
    }
};

module.exports = config;