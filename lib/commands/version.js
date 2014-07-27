var pkg = require('../../package.json');

var version = function (commands, options) {
    console.log(pkg.name, pkg.version);
};

module.exports = version;