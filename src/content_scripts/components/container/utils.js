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

                below_video.insertBefore(
                    youloop_container,
                    below_video.firstElementChild
                );

                Object.values(Components).forEach((Component) => {
                    if (
                        Component.Listeners &&
                        Component.Listeners.addInitialListeners
                    ) {
                        Component.Listeners.addInitialListeners();
                    }

                    if (
                        Component.Intervals &&
                        Component.Intervals.setInitialIntervals
                    ) {
                        Component.Intervals.setInitialIntervals();
                    }

                    if (
                        Component.Observers &&
                        Component.Observers.addInitialObservers
                    ) {
                        Component.Observers.addInitialObservers();
                    }
                });
            }
        }, 0);
    },
    remove: () => {
        const { Components } = require('../main');

        Object.values(Components).forEach((Component) => {
            if (Component.Intervals && Component.Intervals.clearAllIntervals) {
                Component.Intervals.clearAllIntervals();
            }

            if (
                Component.Observers &&
                Component.Observers.disconnectAllObservers
            ) {
                Component.Observers.disconnectAllObservers();
            }
        });

        Components.Transpose.Utils.reset();

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
        justify-content: space-around;
    `;

        const template = document.createElement('template');
        template.innerHTML = `
            <div id="youloop-container" style="${style}">
            </div>
        `;

        template.content.firstElementChild.append(...children);

        return template.content.firstElementChild;
    },
    get: () => document.querySelector('#youloop-container'),
};

module.exports = { Utils };
