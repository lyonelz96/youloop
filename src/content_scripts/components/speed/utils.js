function getInnerHTML() {
    const style = `
        display: flex;
        flex-direction: column;
        gap: 1rem;
    `;

    return `
        <div id="youloop-speed-container" style="${style}">
            <div>
                <label for="youloop-speed">Speed</label>
                <input type="checkbox" id="youloop-speed" name="youloop-speed">
            </div>

            <div>
                <label for="youloop-speed-rate">Speed 100%</label>
                <br>
                <input 
                    type="range" 
                    id="youloop-speed-rate" 
                    name="youloop-speed-rate" 
                    min="0"
                    max="100"
                    value="100"
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
    init: () => {},
    clear: () => {},
    get: () => document.querySelector('#youloop-speed-container'),
    getCheckbox: () => document.querySelector('#youloop-speed'),
    getRateRange: () => document.querySelector('#youloop-speed-rate'),
};

module.exports = { Utils };
