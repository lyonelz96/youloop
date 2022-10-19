function getInnerHTML() {
    const style = `
        display: flex;
        flex-direction: column;
        gap: 1rem;
    `;

    return `
        <div id="youloop-transpose-container" style="${style}">
            <div>
                <label for="youloop-transpose">Tranpose</label>
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

const Utils = {
    build: () => {
        const template = document.createElement('template');
        template.innerHTML = getInnerHTML();
        return template.content.firstElementChild;
    },
    get: () => document.querySelector('#youloop-transpose-container'),
};

module.exports = { Utils };
