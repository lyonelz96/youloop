const { GlobalUtils } = require('../../../utils');

const OnInput = {
    Rate: () => {
        const { Utils } = require('./utils');
        const range = Utils.getRateRange();

        range.addEventListener('input', () => {
            const video = GlobalUtils.getYoutubeVideo();
            const label = range.labels[0];
            const rate = range.value;
            const checkbox = Utils.getCheckbox();

            label.innerText = `Speed ${rate}%`;

            if (checkbox.checked) {
                video.playbackRate = rate / 100;
            }
        });
    },
    Checkbox: () => {
        const { Utils } = require('./utils');
        const checkbox = Utils.getCheckbox();

        checkbox.addEventListener('input', () => {
            const video = GlobalUtils.getYoutubeVideo();
            const range = Utils.getRateRange();
            const rate = range.value;

            if (checkbox.checked) {
                video.playbackRate = rate / 100;
            } else {
                video.playbackRate = 1;
            }
        });
    },
};

function addInitialListeners() {
    const listeners = [OnInput.Rate, OnInput.Checkbox];

    for (const listener of listeners) {
        listener();
    }
}

const Listeners = { addInitialListeners };

module.exports = { Listeners };
