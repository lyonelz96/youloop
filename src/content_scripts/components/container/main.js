const { Utils } = require('./utils');
const { Listeners } = require('./listeners');
const { Observers } = require('./observers');

const Container = { Utils, Listeners, Observers };

module.exports = { Container };
