function insertYouLoopContainer() {
    const youloop_container = document.querySelector('#youloop-container');

    if (youloop_container) {
        youloop_container.remove();
    }

    const wait = setInterval(() => {
        const below_video = document.querySelector('#below');

        if (below_video) {
            clearInterval(wait);

            const youloop_container = buildYouLoopContainer();
            below_video.insertBefore(
                youloop_container,
                below_video.firstElementChild
            );
        }
    }, 0);
}

function buildYouLoopContainer() {
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

    const components = [buildLoopComponent()];
    template.content.firstElementChild.append(...components);

    return template.content.firstElementChild;
}

function toggleYouLoopContainer() {
    const youloop_container = document.querySelector('#youloop-container');

    youloop_container.hidden = !youloop_container.hidden;
}

function buildLoopComponent() {
    const style = `
        display: flex;
        flex-direction: column;
        gap: 1rem;
    `;

    const template = document.createElement('template');
    template.innerHTML = `
        <div id="youloop-loop-container" style="${style}">
            <div>
                <label for="youloop-loop">Loop</label>
                <input type="checkbox" id="youloop-loop" name="youloop-loop" checked>
            </div>

            <div>
                <label for="youloop-loop-start">Start 0:00</label>
                <br>
                <input type="range" id="youloop-loop-start" name="youloop-loop-start">
            </div>

            <div>
                <label for="youloop-loop-end">End 0:00</label>
                <br>
                <input type="range" id="youloop-loop-end" name="youloop-loop-end"> </div>
        </div>
    `;

    return template.content.firstElementChild;
}

async function init() {
    const local_obj = await browser.storage.local.get();
    const enabled = local_obj['youloop-default-enable'];

    if (enabled) {
        insertYouLoopContainer();
    }
}

init();

browser.runtime.onMessage.addListener(async (msg) => {
    if (msg.toggle) {
        const youloop_container = document.querySelector('#youloop-container');

        if (!youloop_container) {
            insertYouLoopContainer();
        } else {
            toggleYouLoopContainer();
        }
    }
});
