const TimeFormat = require('hh-mm-ss');
const { GlobalUtils } = require('../../../utils');

const OnInput = {
    Ranges: () => {
        const { Utils } = require('./utils');
        const ranges = Utils.getRanges();

        function getNewTime(val) {
            return TimeFormat.fromS(Number(val));
        }

        for (let range of ranges) {
            range.addEventListener('input', () => {
                const label = range.labels[0];
                const video = GlobalUtils.getYoutubeVideo();
                const checkbox = Utils.getCheckbox();

                if (label.innerText.includes('Start')) {
                    const endVal = Number(ranges[1].value);

                    if (Number(range.value) >= endVal) {
                        range.value = String(Number(endVal - 1));
                    }

                    label.innerText = `Start ${getNewTime(range.value)}`;

                    if (checkbox.checked) {
                        video.currentTime = range.value;
                    }
                } else if (label.innerText.includes('End')) {
                    const startVal = Number(ranges[0].value);

                    if (Number(range.value) <= startVal) {
                        range.value = String(Number(startVal + 1));
                    }

                    label.innerText = `End ${getNewTime(range.value)}`;

                    if (checkbox.checked) {
                        video.currentTime = range.value - 2;
                    }
                }
            });
        }
    },
    Checkbox: () => {
        const { Utils } = require('./utils');
        const { Intervals } = require('./intervals');
        const checkbox = Utils.getCheckbox();

        checkbox.addEventListener('input', () => {
            if (!checkbox.checked) {
                Intervals.LoopInterval.clear();
            } else {
                Intervals.LoopInterval.set();
            }
        });
    },
};

function addInitialListeners() {
    const listeners = [OnInput.Ranges, OnInput.Checkbox];

    for (const listener of listeners) {
        listener();
    }
}

const Listeners = {
    addInitialListeners,
};

module.exports = { Listeners };
