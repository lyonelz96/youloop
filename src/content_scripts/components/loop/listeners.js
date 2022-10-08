const { LoopComponentUtils } = require('./utils');
const TimeFormat = require('hh-mm-ss');
const { LoopComponentIntervals } = require('./intervals');

function onInput(LoopComponent) {
    function LoopRanges() {
        const ranges = LoopComponentUtils.getRangesInputEl(LoopComponent);

        for (let range of ranges) {
            range.addEventListener('input', () => {
                const label = range.labels[0];
                const newTime = TimeFormat.fromS(Number(range.value));

                if (label.innerText.includes('Start')) {
                    label.innerText = `Start ${newTime}`;
                } else if (label.innerText.includes('End')) {
                    label.innerText = `End ${newTime}`;
                }
            });
        }
    }

    function LoopCheckbox() {
        const checkbox = LoopComponentUtils.getLoopCheckbox(LoopComponent);

        checkbox.addEventListener('input', () => {
            const loop_interval_id = LoopComponentIntervals.getLoopIntervalId();

            if (!checkbox.checked) {
                clearInterval(loop_interval_id);
            } else {
                LoopComponentIntervals.setIntervals();
            }
        });
    }

    return [LoopRanges, LoopCheckbox];
}

function addListeners(LoopComponent) {
    const listeners = [onInput(LoopComponent)];

    for (let listener of listeners.flat()) {
        listener();
    }
}

const LoopComponentListeners = {
    addListeners,
};

module.exports = { LoopComponentListeners };
