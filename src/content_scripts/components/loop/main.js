const { LoopComponentUtils } = require('./utils');
const { LoopComponentListeners } = require('./listeners');

const LoopComponent = LoopComponentUtils.buildLoopComponent();
LoopComponentListeners.addListeners(LoopComponent);

module.exports = { LoopComponent };
