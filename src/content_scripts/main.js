const { ContentScriptUtils } = require('./utils');
const { ContentScriptListeners } = require('./listeners');
const { GlobalUtils } = require('../utils.js');

async function init() {
    const enabled = await GlobalUtils.getLoopDefaultEnable();

    if (enabled) {
        ContentScriptUtils.insertYouLoopContainer();
    }

    ContentScriptListeners.onMessage();
}

init();
