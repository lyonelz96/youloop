const { ContentScriptUtils } = require('./utils');

function onMessage() {
    browser.runtime.onMessage.addListener((msg) => {
        if (msg.toggle) {
            const youloop_container = ContentScriptUtils.getYouLoopContainer();

            if (!youloop_container) {
                ContentScriptUtils.insertYouLoopContainer();
            } else {
                ContentScriptUtils.toggleYouLoopContainer();
            }
        }
    });
}

const ContentScriptListeners = {
    onMessage,
};

module.exports = { ContentScriptListeners };
