const TimeFormat = require('hh-mm-ss');
const { GlobalUtils } = require('../../../../src/utils');

function getVideoInitialDurationFormatted() {
    const duration = GlobalUtils.getYoutubeVideo().duration;
    let [start, end] = [null, null];

    end = TimeFormat.fromS(duration).split('.')[0];
    start = end
        .split('')
        .map((c) => (c === ':' ? ':' : '0'))
        .join('');

    return [start, end];
}

const Utils = {
    build: () => {
        const style = `
        display: flex;
        flex-direction: column;
        gap: 1rem;
        `;

        const loop_container = document.createElement('div');
        GlobalUtils.setAttributes(loop_container, {
            id: 'youloop-loop-container',
            style: style,
        });

        const loop_checkbox_container = document.createElement('div');

        const loop_checkbox_label = document.createElement('label');
        loop_checkbox_label.textContent = 'Loop';
        GlobalUtils.setAttributes(loop_checkbox_label, {
            for: 'youloop-loop',
        });

        const loop_checkbox_input = document.createElement('input');
        GlobalUtils.setAttributes(loop_checkbox_input, {
            type: 'checkbox',
            id: 'youloop-loop',
            name: 'youloop-loop',
        });

        loop_checkbox_container.append(
            loop_checkbox_label,
            loop_checkbox_input
        );

        const [start, end] = getVideoInitialDurationFormatted();
        const duration = Math.trunc(GlobalUtils.getYoutubeVideo().duration);

        const loop_start_container = document.createElement('div');

        const loop_start_label = document.createElement('label');
        loop_start_label.textContent = `Start ${start}`;
        GlobalUtils.setAttributes(loop_start_label, {
            for: 'youloop-loop-start',
        });

        const loop_start_input = document.createElement('input');
        GlobalUtils.setAttributes(loop_start_input, {
            type: 'range',
            id: 'youloop-loop-start',
            name: 'youloop-loop-start',
            min: 0,
            max: duration,
            value: 0,
        });

        loop_start_container.append(
            loop_start_label,
            document.createElement('br'),
            loop_start_input
        );

        const loop_end_container = document.createElement('div');

        const loop_end_label = document.createElement('label');
        loop_end_label.textContent = `End ${end}`;
        GlobalUtils.setAttributes(loop_end_label, {
            for: 'youloop-loop-end',
        });

        const loop_end_input = document.createElement('input');
        GlobalUtils.setAttributes(loop_end_input, {
            type: 'range',
            id: 'youloop-loop-end',
            name: 'youloop-loop-end',
            min: 0,
            max: duration,
            value: duration,
        });

        loop_end_container.append(
            loop_end_label,
            document.createElement('br'),
            loop_end_input
        );

        loop_container.append(
            loop_checkbox_container,
            loop_start_container,
            loop_end_container
        );

        return loop_container;
    },
    init: () => {
        const { Intervals } = require('./intervals');
        const { Listeners } = require('./listeners');

        Listeners.addInitialListeners();
        Intervals.setInitialIntervals();
    },
    clear: () => {
        const { Intervals } = require('./intervals');

        Intervals.clearAllIntervals();
    },
    getRanges: () => {
        const start = document.querySelector('#youloop-loop-start');
        const end = document.querySelector('#youloop-loop-end');

        return [start, end];
    },
    get: () => document.querySelector('#youloop-loop-container'),
    getCheckbox: () => document.querySelector('#youloop-loop'),
};

module.exports = { Utils };
