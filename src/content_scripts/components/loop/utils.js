function buildLoopComponent() {
    const style = `
        display: flex;
        flex-direction: column;
        gap: 1rem;
    `;

    const template = document.createElement('template');
    template.innerHTML = `
        <div id="youloop-loop-container" style="${style}">
            <div>
                <label for="youloop-loop">Loop</label>
                <input type="checkbox" id="youloop-loop" name="youloop-loop" checked>
            </div>

            <div>
                <label for="youloop-loop-start">Start 0:00</label>
                <br>
                <input type="range" id="youloop-loop-start" name="youloop-loop-start">
            </div>

            <div>
                <label for="youloop-loop-end">End 0:00</label>
                <br>
                <input type="range" id="youloop-loop-end" name="youloop-loop-end"> </div>
        </div>
    `;

    return template.content.firstElementChild;
}

module.exports = { buildLoopComponent };
