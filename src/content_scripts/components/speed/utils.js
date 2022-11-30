const { GlobalUtils } = require('../../../utils');

const Utils = {
    build: () => {
        const style = `
        display: flex;
        flex-direction: column;
        gap: 1rem;
    `;

        const speed_container = document.createElement('div');
        GlobalUtils.setAttributes(speed_container, {
            id: 'youloop-speed-container',
            style: style,
        });

        const speed_checkbox_container = document.createElement('div');

        const speed_checkbox_label = document.createElement('label');
        speed_checkbox_label.textContent = 'Speed';
        GlobalUtils.setAttributes(speed_checkbox_label, {
            for: 'youloop-speed',
        });

        const speed_checkbox_input = document.createElement('input');
        GlobalUtils.setAttributes(speed_checkbox_input, {
            type: 'checkbox',
            id: 'youloop-speed',
            name: 'youloop-speed',
        });

        speed_checkbox_container.append(
            speed_checkbox_label,
            speed_checkbox_input
        );

        const speed_controls_container = document.createElement('div');

        const speed_controls_label = document.createElement('label');
        speed_controls_label.textContent = 'Speed 100%';
        GlobalUtils.setAttributes(speed_controls_label, {
            for: 'youloop-speed-rate',
        });

        const speed_controls_input = document.createElement('input');
        GlobalUtils.setAttributes(speed_controls_input, {
            type: 'range',
            id: 'youloop-speed-rate',
            name: 'youloop-speed-rate',
            min: 0,
            max: 100,
            value: 100,
        });

        speed_controls_container.append(
            speed_controls_label,
            document.createElement('br'),
            speed_controls_input
        );

        speed_container.append(
            speed_checkbox_container,
            speed_controls_container
        );

        return speed_container;
    },
    init: () => {
        const { Listeners } = require('./listeners');
        Listeners.addInitialListeners();
    },
    clear: () => {
        const video = GlobalUtils.getYoutubeVideo();
        video.playbackRate = 1;
    },
    get: () => document.querySelector('#youloop-speed-container'),
    getCheckbox: () => document.querySelector('#youloop-speed'),
    getRateRange: () => document.querySelector('#youloop-speed-rate'),
};

module.exports = { Utils };
