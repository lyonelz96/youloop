(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const { GlobalUtils } = require('../../utils');
const { PopupUtils } = require('./utils');

function onChange() {
    function DefaultEnableCheckbox() {
        const default_enable_checkbox = PopupUtils.getDefaultEnableCheckbox();

        default_enable_checkbox.addEventListener('change', async () => {
            await GlobalUtils.setLoopDefaultEnable(
                default_enable_checkbox.checked
            );
        });
    }

    return [DefaultEnableCheckbox];
}

function onClick() {
    function ToggleButton() {
        PopupUtils.getToggleButton().addEventListener('click', async () => {
            const tabs = await browser.tabs.query({
                active: true,
                currentWindow: true,
            });

            browser.tabs.sendMessage(tabs[0].id, {
                toggle: true,
            });
        });
    }

    return [ToggleButton];
}

function addListeners() {
    const listeners = [onChange(), onClick()];

    for (let listener of listeners.flat()) {
        listener();
    }
}

const PopupListeners = { addListeners };

module.exports = { PopupListeners };

},{"../../utils":4,"./utils":3}],2:[function(require,module,exports){
const { GlobalUtils } = require('../../utils');
const { PopupUtils } = require('./utils');
const { PopupListeners } = require('./listeners');

async function init() {
    const default_enabled = await GlobalUtils.getLoopDefaultEnable();

    PopupUtils.getDefaultEnableCheckbox().checked = default_enabled
        ? true
        : false;

    PopupListeners.addListeners();
}

init();

},{"../../utils":4,"./listeners":1,"./utils":3}],3:[function(require,module,exports){
const { GlobalUtils } = require('../../utils.js');

function getDefaultEnableCheckbox() {
    return document.querySelector(
        'input[id="youloop-default-enable"][type="checkbox"]'
    );
}

async function toggleDefaultEnableCheckbox() {
    const checked = await GlobalUtils.getLoopDefaultEnable();
    getDefaultEnableCheckbox().checked = checked ? true : false;
}

function getToggleButton() {
    return document.querySelector('#youloop-toggle-btn');
}

const PopupUtils = {
    getDefaultEnableCheckbox,
    getToggleButton,
    toggleDefaultEnableCheckbox,
};

module.exports = { PopupUtils };

},{"../../utils.js":4}],4:[function(require,module,exports){
async function getLoopDefaultEnable() {
    const local_obj = await browser.storage.local.get();
    return local_obj['youloop-default-enable'];
}

async function setLoopDefaultEnable(checked) {
    await browser.storage.local.set({
        'youloop-default-enable': checked,
    });
}

const GlobalUtils = {
    getLoopDefaultEnable,
    setLoopDefaultEnable,
};

module.exports = { GlobalUtils };

},{}]},{},[2]);
