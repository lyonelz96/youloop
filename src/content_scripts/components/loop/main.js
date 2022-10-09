const { LoopComponentUtils } = require('./utils');
const { LoopComponentListeners } = require('./listeners');
const { LoopComponentIntervals } = require('./intervals');

const LoopComponent = LoopComponentUtils.buildLoopComponent();

module.exports = {
    LoopComponent,
    addListeners: LoopComponentListeners.addListeners,
    setIntervals: LoopComponentIntervals.setIntervals,
};
