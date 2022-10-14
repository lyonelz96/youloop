const { GlobalUtils } = require('../../utils');
const { Utils } = require('./utils');

const OnChange = {
    DefaultEnableCheckbox: () => {
        const default_enable_checkbox = Utils.getDefaultEnableCheckbox();

        default_enable_checkbox.addEventListener('change', async () => {
            await GlobalUtils.setLoopDefaultEnable(
                default_enable_checkbox.checked
            ).catch(GlobalUtils.errorLogger);
        });
    },
};

const OnClick = {
    ToggleButton: () => {
        Utils.getToggleButton().addEventListener('click', async () => {
            await GlobalUtils.sendMessageToActiveTab({ toggle: true }).catch(
                GlobalUtils.errorLogger
            );
        });
    },
};

function addListeners() {
    const listeners = [...Object.values(OnChange), ...Object.values(OnClick)];

    for (let listener of listeners) {
        listener();
    }
}

const Listeners = { addListeners };

module.exports = { Listeners };
