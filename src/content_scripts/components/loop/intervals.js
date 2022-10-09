const { ContentScriptUtils } = require('../../utils');
const { LoopComponentUtils } = require('./utils');

const ids = {};

function LoopInterval() {
    const video = ContentScriptUtils.getYoutubeVideo();

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
        const ranges = LoopComponentUtils.getRangesInputEl();

        if (!ranges.includes(null)) {
            clearInterval(wait);

            const id = loopInterval(ranges);
            const loop_container =
                LoopComponentUtils.getLoopComponentContainer();
            loop_container.setAttribute('loop-interval-id', id);
            ids['loop-interval-id'] = id;
        }
    }, 0);
}

function getLoopIntervalId() {
    return LoopComponentUtils.getLoopComponentContainer().getAttribute(
        'loop-interval-id'
    );
}

function setIntervals() {
    const intervals = [LoopInterval];

    for (let interval of intervals) {
        interval();
    }
}

function clearIntervals() {
    for (let id of Object.values(ids)) {
        clearInterval(id);
    }
}

const LoopComponentIntervals = {
    setIntervals,
    getLoopIntervalId,
    clearIntervals,
};

module.exports = { LoopComponentIntervals };
