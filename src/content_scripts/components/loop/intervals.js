const { ContentScriptUtils } = require('../../utils');
const { LoopComponent } = require('./main');

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
            const ranges = LoopComponent.utils.getRangesInputEl();

            if (!ranges.includes(null)) {
                clearInterval(wait);

                const id = loopInterval(ranges);
                const loop_container =
                    LoopComponent.utils.getLoopComponentContainer();
                loop_container.setAttribute('loop-interval-id', id);
            }
        }, 0);
    },
    clear: () => {
        const id = LoopInterval.getID();
        clearInterval(id);
    },
    getID: () =>
        LoopComponent.utils.getLoopComponentContainer().getAttribute(
            'loop-interval-id'
        ),
};

function setInitialIntervals() {
    const intervals = [LoopInterval];

    for (const interval of intervals) {
        interval.set();
    }
}

const LoopComponentIntervals = { setInitialIntervals, LoopInterval };

module.exports = { LoopComponentIntervals };
