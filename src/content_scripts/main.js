const utils = require('./utils');
const listeners = require('./listeners');

async function init() {
    const local_obj = await browser.storage.local.get();
    const enabled = local_obj['youloop-default-enable'];

    if (enabled) {
        utils.insertYouLoopContainer();
    }

    listeners.onMessage();
}

init();
