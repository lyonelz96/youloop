const { GlobalUtils } = require('../../src/utils');
const { Components } = require('./components/main');

async function init() {
    const { pathname, searchParams } = new URL(document.URL);

    if (pathname === '/watch' && searchParams.has('v')) {
        const enabled = await GlobalUtils.getLoopDefaultEnable().catch(
            GlobalUtils.errorLogger
        );

        if (enabled && !Components.Container.Utils.get()) {
            Components.Container.Utils.insert();
        }
    }

    Components.Container.Listeners.OnMessage.Toggle();
}

init();
