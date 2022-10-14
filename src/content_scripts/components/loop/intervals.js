const { GlobalUtils } = require('../../../../src/utils');
const { Utils } = require('./utils');

const LoopInterval = {
    set: () => {
        const video = GlobalUtils.getYoutubeVideo();

        const loopInterval = (ranges) =>
            setInterval(() => {
                const [start, end] = ranges;

                if (
                    video.currentTime < start.value ||
                    video.currentTime >= end.value
                ) {
                    video.currentTime = start.value;
                }
            }, 0);

        const wait = setInterval(() => {
            const ranges = Utils.getRanges();

            if (!ranges.includes(null)) {
                clearInterval(wait);

                const id = loopInterval(ranges);
                const loop_container = Utils.get();
                loop_container.setAttribute('loop-interval-id', id);
            }
        }, 0);
    },
    clear: () => {
        const id = LoopInterval.getID();
        clearInterval(id);
    },
    getID: () => Utils.get().getAttribute('loop-interval-id'),
};

function setInitialIntervals() {
    const intervals = [LoopInterval];

    for (const interval of intervals) {
        interval.set();
    }
}

function clearAllIntervals() {
    const intervals = [LoopInterval];

    for (const interval of intervals) {
        interval.clear();
    }
}

const Intervals = { setInitialIntervals, clearAllIntervals, LoopInterval };

module.exports = { Intervals };
