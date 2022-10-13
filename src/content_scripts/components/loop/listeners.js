const { LoopComponent } = require('./main');
const TimeFormat = require('hh-mm-ss');

const OnInput = {
    LoopRanges: () => {
        const ranges = LoopComponent.utils.getRangesInputEl();

        function getNewTime(val) {
            return TimeFormat.fromS(Number(val));
        }

        for (let range of ranges) {
            range.addEventListener('input', () => {
                const label = range.labels[0];

                if (label.innerText.includes('Start')) {
                    const endVal = Number(ranges[1].value);

                    if (Number(range.value) >= endVal) {
                        range.value = String(Number(endVal - 1));
                    }

                    label.innerText = `Start ${getNewTime(range.value)}`;
                } else if (label.innerText.includes('End')) {
                    const startVal = Number(ranges[0].value);

                    if (Number(range.value) <= startVal) {
                        range.value = String(Number(startVal + 1));
                    }

                    label.innerText = `End ${getNewTime(range.value)}`;
                }
            });
        }
    },
    LoopCheckbox: () => {
        const checkbox = LoopComponent.utils.getLoopCheckbox();

        checkbox.addEventListener('input', () => {
            if (!checkbox.checked) {
                LoopComponent.intervals.LoopInterval.clear();
            } else {
                LoopComponent.intervals.LoopInterval.set();
            }
        });
    },
};

function addInitialListeners() {
    const listeners = [OnInput.LoopRanges, OnInput.LoopCheckbox];

    for (let listener of listeners) {
        listener();
    }
}

const LoopComponentListeners = {
    addInitialListeners,
};

module.exports = { LoopComponentListeners };
