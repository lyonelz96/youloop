const { LoopComponentUtils } = require('./utils');
const { LoopComponentListeners } = require('./listeners');
const { LoopComponentIntervals } = require('./intervals');

module.exports = {
    buildComponent: LoopComponentUtils.buildLoopComponent,
    addListeners: LoopComponentListeners.addListeners,
    setIntervals: LoopComponentIntervals.setIntervals,
};
