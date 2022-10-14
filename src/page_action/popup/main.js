const { GlobalUtils } = require('../../utils');
const { Utils } = require('./utils');
const { Listeners } = require('./listeners');

async function init() {
    const default_enabled = await GlobalUtils.getLoopDefaultEnable().catch(
        GlobalUtils.errorLogger
    );

    Utils.getDefaultEnableCheckbox().checked = default_enabled ? true : false;

    Listeners.addListeners();
}

init();
