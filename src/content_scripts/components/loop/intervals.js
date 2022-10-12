const { ContentScriptUtils } = require('../../utils');
const { LoopComponentUtils } = require('./utils');

const LoopInterval = {
    set: () => {
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
            }
        }, 0);
    },
    clear: () => {
        const id = this.getID();
        clearInterval(id);
    },
    getID: () =>
        LoopComponentUtils.getLoopComponentContainer().getAttribute(
            'loop-interval-id'
        ),
};

const addInitialIntervals = [LoopInterval];

const LoopComponentIntervals = { addInitialIntervals, LoopInterval };

module.exports = { LoopComponentIntervals };
