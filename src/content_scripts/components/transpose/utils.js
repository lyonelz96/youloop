const Tone = require('tone');
const { GlobalUtils } = require('../../../utils');

function initAudioNodes() {
    const video = GlobalUtils.getYoutubeVideo();
    let source = null;
    let pitch_shift = null;

    if (Utils.getSource && Utils.getPitchShift) {
        source = Utils.getSource();
        pitch_shift = Utils.getPitchShift();
        disconnect();
    } else {
        source = Tone.context.createMediaElementSource(video);
        pitch_shift = new Tone.PitchShift({ pitch: 0, windowSize: 0.065 });

        Utils.getSource = () => source;
        Utils.getPitchShift = () => pitch_shift;
    }

    Tone.connect(source, Tone.context.destination);
}

function getNodes() {
    return {
        source: Utils.getSource(),
        pitch_shift: Utils.getPitchShift(),
    };
}

function disconnect(nodes = getNodes()) {
    const { source, pitch_shift } = nodes;

    source.disconnect();
    pitch_shift.disconnect();
}

const Utils = {
    build: () => {
        initAudioNodes();

        const style = `
        display: flex;
        flex-direction: column;
        gap: 1rem;
    `;

        const transpose_container = document.createElement('div');
        GlobalUtils.setAttributes(transpose_container, {
            id: 'youloop-transpose-container',
            style: style,
        });

        const transpose_checkbox_container = document.createElement('div');

        const transpose_checkbox_label = document.createElement('label');
        transpose_checkbox_label.textContent = 'Transpose';
        GlobalUtils.setAttributes(transpose_checkbox_label, {
            for: 'youloop-transpose',
        });

        const transpose_checkbox_input = document.createElement('input');
        GlobalUtils.setAttributes(transpose_checkbox_input, {
            type: 'checkbox',
            id: 'youloop-transpose',
            name: 'youloop-transpose',
        });

        transpose_checkbox_container.append(
            transpose_checkbox_label,
            transpose_checkbox_input
        );

        const transpose_controls_container = document.createElement('div');

        const transpose_controls_label = document.createElement('label');
        transpose_controls_label.textContent = 'Semitones 0';
        GlobalUtils.setAttributes(transpose_controls_label, {
            for: 'youloop-transpose-semitones',
        });

        const transpose_controls_input = document.createElement('input');
        GlobalUtils.setAttributes(transpose_controls_input, {
            type: 'range',
            id: 'youloop-transpose-semitones',
            name: 'youloop-transpose-semitones',
            min: -12,
            max: 12,
            value: 0,
        });

        transpose_controls_container.append(
            transpose_controls_label,
            document.createElement('br'),
            transpose_controls_input
        );

        transpose_container.append(
            transpose_checkbox_container,
            transpose_controls_container
        );

        return transpose_container;
    },
    init: () => {
        const { Listeners } = require('./listeners');
        Listeners.addInitialListeners();
    },
    clear: () => {
        Utils.reset();
    },
    connect: (nodes = getNodes()) => {
        disconnect();

        const { source, pitch_shift } = nodes;
        pitch_shift.pitch = Number(Utils.getSemitoneRange().value);
        Tone.connect(source, pitch_shift);
        Tone.connect(pitch_shift, Tone.context.destination);
    },
    reset: (nodes = getNodes()) => {
        disconnect();

        const { source, pitch_shift } = nodes;
        pitch_shift.pitch = 0;
        Tone.connect(source, Tone.context.destination);
    },
    get: () => document.querySelector('#youloop-transpose-container'),
    getCheckbox: () => document.querySelector('#youloop-transpose'),
    getSemitoneRange: () =>
        document.querySelector('#youloop-transpose-semitones'),
};

module.exports = { Utils };
