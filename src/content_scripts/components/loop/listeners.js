const { LoopComponentUtils } = require('./utils');
const TimeFormat = require('hh-mm-ss');

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

    return [LoopRanges];
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
