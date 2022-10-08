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
            const tabs = await browser.tabs
                .query({
                    active: true,
                    currentWindow: true,
                })
                .catch(GlobalUtils.errorLogger);

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
