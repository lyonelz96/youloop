const { GlobalUtils } = require('../../../utils');

const Utils = {
    insert: () => {
        const wait = setInterval(() => {
            const below_video = document.querySelector('#below');

            if (below_video) {
                clearInterval(wait);

                const { Components } = require('../main');

                const youloop_container = Utils.build(
                    Object.keys(Components)
                        .filter((key) => key !== 'Container')
                        .map((key) => Components[key].Utils.build())
                );

                below_video.prepend(youloop_container);

                Object.values(Components).forEach((Component) => {
                    if (Component.Utils.init) {
                        Component.Utils.init();
                    }
                });
            }
        }, 0);
    },
    remove: () => {
        const { Components } = require('../main');

        Object.values(Components).forEach((Component) => {
            if (Component.Utils.clear) {
                Component.Utils.clear();
            }
        });

        const container = Utils.get();
        container.remove();
    },
    build: (children) => {
        const isDark = document.querySelector('html').hasAttribute('dark');
        const textColor = isDark ? 'white' : 'black';

        const style = `
        color: ${textColor};
        font-size: 1.5rem;
        margin-top: 1rem;

        display: flex;
        flex-direction: row;
        gap: 1rem;
    `;

        const youloop_container = document.createElement('div');
        GlobalUtils.setAttributes(youloop_container, {
            id: 'youloop-container',
            style: style,
        });

        youloop_container.append(...children);

        return youloop_container;
    },
    init: () => {
        const { Listeners } = require('./listeners');
        const { Observers } = require('./observers');

        Listeners.addInitialListeners();
        Observers.addInitialObservers();
    },
    clear: () => {
        const { Observers } = require('./observers');

        Observers.disconnectAllObservers();
    },
    get: () => document.querySelector('#youloop-container'),
};

module.exports = { Utils };
