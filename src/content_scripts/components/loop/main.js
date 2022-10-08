const { LoopComponentUtils } = require('./utils');
const { LoopComponentListeners } = require('./listeners');
const { LoopComponentIntervals } = require('./intervals');

const LoopComponent = LoopComponentUtils.buildLoopComponent();
LoopComponentListeners.addListeners(LoopComponent);
LoopComponentIntervals.setIntervals();

module.exports = { LoopComponent };
