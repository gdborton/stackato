module.exports = {
    config: require('./config'),
    commands: {
        apps: require('./commands/apps'),
        target: require('./commands/target'),
        login: require('./commands/login'),
        version: require('./commands/version')
    }
}