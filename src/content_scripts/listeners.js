const utils = require('./utils');

function onMessage() {
    browser.runtime.onMessage.addListener((msg) => {
        if (msg.toggle) {
            const youloop_container = utils.getYouLoopContainer();

            if (!youloop_container) {
                utils.insertYouLoopContainer();
            } else {
                utils.toggleYouLoopContainer();
            }
        }
    });
}

module.exports = { onMessage };
