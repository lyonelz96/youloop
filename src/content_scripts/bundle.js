(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const { buildLoopComponent } = require('./utils');
const LoopComponent = buildLoopComponent();
module.exports = { LoopComponent };

},{"./utils":2}],2:[function(require,module,exports){
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

module.exports = { buildLoopComponent };

},{}],3:[function(require,module,exports){
const Components = [require('../components/loop/main')];
module.exports = { Components };

},{"../components/loop/main":1}],4:[function(require,module,exports){
const utils = require('./utils');

function onMessage() {
    browser.runtime.onMessage.addListener((msg) => {
        if (msg.toggle) {
            const youloop_container = utils.getYouLoopContainer();

            if (!youloop_container) {
                utils.insertYouLoopContainer();
            } else {
                utils.toggleYouLoopContainer();
            }
        }
    });
}

module.exports = { onMessage };

},{"./utils":6}],5:[function(require,module,exports){
const utils = require('./utils');
const listeners = require('./listeners');

async function init() {
    const local_obj = await browser.storage.local.get();
    const enabled = local_obj['youloop-default-enable'];

    if (enabled) {
        utils.insertYouLoopContainer();
    }

    listeners.onMessage();
}

init();

},{"./listeners":4,"./utils":6}],6:[function(require,module,exports){
function insertYouLoopContainer() {
    const youloop_container = getYouLoopContainer();

    if (youloop_container) {
        youloop_container.remove();
    }

    const wait = setInterval(() => {
        const below_video = document.querySelector('#below');

        if (below_video) {
            clearInterval(wait);

            const { Components } = require('./components/main');
            const youloop_container = buildYouLoopContainer(
                Components.map((c) => Object.values(c)[0])
            );
            below_video.insertBefore(
                youloop_container,
                below_video.firstElementChild
            );
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

module.exports = {
    insertYouLoopContainer,
    buildYouLoopContainer,
    toggleYouLoopContainer,
    getYouLoopContainer,
};

},{"./components/main":3}]},{},[5]);
