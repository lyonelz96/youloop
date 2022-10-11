const { GlobalUtils } = require('../../utils');
const { PopupUtils } = require('./utils');

function onChange() {
    function DefaultEnableCheckbox() {
        const default_enable_checkbox = PopupUtils.getDefaultEnableCheckbox();

        default_enable_checkbox.addEventListener('change', async () => {
            await GlobalUtils.setLoopDefaultEnable(
                default_enable_checkbox.checked
            ).catch(GlobalUtils.errorLogger);
        });
    }

    return [DefaultEnableCheckbox];
}

function onClick() {
    function ToggleButton() {
        PopupUtils.getToggleButton().addEventListener('click', async () => {
            await GlobalUtils.sendMessageToActiveTab({ toggle: true }).catch(
                GlobalUtils.errorLogger
            );
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
