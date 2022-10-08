const { GlobalUtils } = require('../../utils');
const { PopupUtils } = require('./utils');
const { PopupListeners } = require('./listeners');

async function init() {
    const default_enabled = await GlobalUtils.getLoopDefaultEnable().catch(
        GlobalUtils.errorLogger
    );

    PopupUtils.getDefaultEnableCheckbox().checked = default_enabled
        ? true
        : false;

    PopupListeners.addListeners();
}

init();
