const { LoopComponentUtils } = require('./utils');
const { LoopComponentListeners } = require('./listeners');
const { LoopComponentIntervals } = require('./intervals');

const LoopComponent = {
    utils: LoopComponentUtils,
    listeners: LoopComponentListeners,
    intervals: LoopComponentIntervals,
};

module.exports = { LoopComponent };
