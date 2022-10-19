const OnInput = {
    SemitoneRange: () => {
        const { Utils } = require('./utils');
        const range = Utils.getSemitoneRange();

        range.addEventListener('input', () => {
            const label = range.labels[0];
            const pitch_shift = Utils.getPitchShift();

            pitch_shift.pitch = Number(range.value);
            label.innerText = `Semitones ${range.value}`;
        });
    },
    Checkbox: () => {
        const { Utils } = require('./utils');
        const checkbox = Utils.getCheckbox();

        checkbox.addEventListener('input', () => {
            if (checkbox.checked) {
                Utils.connect();
            } else {
                Utils.reset();
            }
        });
    },
};

function addInitialListeners() {
    const listeners = [OnInput.SemitoneRange, OnInput.Checkbox];

    for (const listener of listeners) {
        listener();
    }
}

const Listeners = { addInitialListeners };

module.exports = { Listeners };
