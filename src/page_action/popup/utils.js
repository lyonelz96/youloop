const { GlobalUtils } = require('../../utils.js');

function getDefaultEnableCheckbox() {
    return document.querySelector(
        'input[id="youloop-default-enable"][type="checkbox"]'
    );
}

async function toggleDefaultEnableCheckbox() {
    const checked = await GlobalUtils.getLoopDefaultEnable().catch(
        GlobalUtils.errorLogger
    );
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
