const { Utils } = require('./utils');

const OnMessage = {
    Toggle: () => {
        browser.runtime.onMessage.addListener((msg) => {
            if (msg.toggle) {
                if (!Utils.get()) {
                    Utils.insert();
                } else {
                    Utils.toggle();
                }
            }
        });
    },
};

function addInitialListeners() {
    const listeners = [];

    for (let listener of listeners) {
        listener();
    }
}

const Listeners = {
    addInitialListeners,
    OnMessage,
};

module.exports = { Listeners };
