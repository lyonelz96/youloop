const { ContentScriptUtils } = require('./utils');

function onMessage() {
    browser.runtime.onMessage.addListener((msg) => {
        if (msg.toggle) {
            if (!ContentScriptUtils.getYouLoopContainer()) {
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
