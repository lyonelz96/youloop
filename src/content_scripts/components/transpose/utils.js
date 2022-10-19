const Tone = require('tone');
const { GlobalUtils } = require('../../../utils');

function getInnerHTML() {
    const style = `
        display: flex;
        flex-direction: column;
        gap: 1rem;
    `;

    return `
        <div id="youloop-transpose-container" style="${style}">
            <div>
                <label for="youloop-transpose">Transpose</label>
                <input type="checkbox" id="youloop-transpose" name="youloop-transpose">
            </div>

            <div>
                <label for="youloop-transpose-semitones">Semitones 0</label>
                <br>
                <input 
                    type="range" 
                    id="youloop-transpose-semitones" 
                    name="youloop-transpose-semitones" 
                    min="-12"
                    max="12"
                    value="0"
                >
            </div>
        </div>
    `;
}

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

        const template = document.createElement('template');
        template.innerHTML = getInnerHTML();
        return template.content.firstElementChild;
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
