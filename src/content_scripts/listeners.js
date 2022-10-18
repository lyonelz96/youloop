const { GlobalUtils } = require('../utils');
const { Components } = require('./components/main');

const OnNavigation = {
    Finish: () => {
        document.addEventListener('yt-navigate-finish', async () => {
            const { pathname, searchParams } = new URL(document.URL);

            if (pathname === '/watch' && searchParams.has('v')) {
                const enabled = await GlobalUtils.getLoopDefaultEnable().catch(
                    GlobalUtils.errorLogger
                );

                const container = Components.Container.Utils.get();

                if (enabled && !container) {
                    Components.Container.Utils.insert();
                }

                if (!enabled && container) {
                    Components.Container.Utils.remove();
                }
            }
        });
    },
};

const Listeners = { OnNavigation };

module.exports = { Listeners };
