const OnMessage = {
    Toggle: () => {
        const { Utils } = require('./utils');

        browser.runtime.onMessage.addListener((msg) => {
            if (msg.toggle) {
                if (!Utils.get()) {
                    Utils.insert();
                } else {
                    Utils.remove();
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
