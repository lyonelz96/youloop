function insertYouLoopContainer() {
    const wait = setInterval(() => {
        const below_video = document.querySelector('#below');

        if (below_video) {
            clearInterval(wait);

            const { Components } = require('./components/main');
            const youloop_container = buildYouLoopContainer(
                Components.map((c) => c.buildComponent())
            );

            below_video.insertBefore(
                youloop_container,
                below_video.firstElementChild
            );

            for (let component of Components) {
                if (component.addListeners) {
                    component.addListeners();
                }

                if (component.setIntervals) {
                    component.setIntervals();
                }
            }
        }
    }, 0);
}

function buildYouLoopContainer(components) {
    const isDark = document.querySelector('html').hasAttribute('dark');
    const textColor = isDark ? 'white' : 'black';

    const style = `
        color: ${textColor};
        font-size: 1.5rem;
        margin-top: 1rem;
    `;

    const template = document.createElement('template');
    template.innerHTML = `
            <div id="youloop-container" style="${style}">
            </div>
        `;

    template.content.firstElementChild.append(...components);

    return template.content.firstElementChild;
}

function toggleYouLoopContainer() {
    const youloop_container = getYouLoopContainer();
    youloop_container.hidden = !youloop_container.hidden;
}

function getYouLoopContainer() {
    return document.querySelector('#youloop-container');
}

function getYoutubeVideo() {
    return document.querySelector('video');
}

const ContentScriptUtils = {
    insertYouLoopContainer,
    buildYouLoopContainer,
    toggleYouLoopContainer,
    getYouLoopContainer,
    getYoutubeVideo,
};

module.exports = { ContentScriptUtils };
