const { ContentScriptUtils } = require('../../utils');
const TimeFormat = require('hh-mm-ss');

function buildLoopComponent() {
    const template = document.createElement('template');
    template.innerHTML = getInnerHTML();
    return template.content.firstElementChild;
}

function getVideoInitialDurationFormatted() {
    const duration = ContentScriptUtils.getYoutubeVideo().duration;
    let [start, end] = [null, null];

    end = TimeFormat.fromS(duration).split('.')[0];
    start = end
        .split('')
        .map((c) => (c === ':' ? ':' : '0'))
        .join('');

    return [start, end];
}

function getInnerHTML() {
    const style = `
        display: flex;
        flex-direction: column;
        gap: 1rem;
    `;

    const [start, end] = getVideoInitialDurationFormatted();
    const duration = Math.trunc(ContentScriptUtils.getYoutubeVideo().duration);

    return `
        <div id="youloop-loop-container" style="${style}">
            <div>
                <label for="youloop-loop">Loop</label>
                <input type="checkbox" id="youloop-loop" name="youloop-loop" checked>
            </div>

            <div>
                <label for="youloop-loop-start">Start ${start}</label>
                <br>
                <input 
                    type="range" 
                    id="youloop-loop-start" 
                    name="youloop-loop-start" 
                    min="0"
                    max="${duration}"
                    value="0"
                >
            </div>

            <div>
                <label for="youloop-loop-end">End ${end}</label>
                <br>
                <input 
                    type="range" 
                    id="youloop-loop-end" 
                    name="youloop-loop-end"
                    min="0"
                    max="${duration}"
                    value="${duration}"
                >
            </div>
        </div>
    `;
}

function getRangesInputEl(LoopComponent) {
    let start = null;
    let end = null;

    if (LoopComponent) {
        start = LoopComponent.querySelector('#youloop-loop-start');
        end = LoopComponent.querySelector('#youloop-loop-end');
    } else {
        start = document.querySelector('#youloop-loop-start');
        end = document.querySelector('#youloop-loop-end');
    }

    return [start, end];
}

function getLoopCheckbox(LoopComponent) {
    let checkbox = null;

    if (LoopComponent) {
        checkbox = LoopComponent.querySelector('#youloop-loop');
    } else {
        checkbox = document.querySelector('#youloop-loop');
    }

    return checkbox;
}

function getLoopComponentContainer() {
    return document.querySelector('#youloop-loop-container');
}

const LoopComponentUtils = {
    buildLoopComponent,
    getRangesInputEl,
    getLoopComponentContainer,
    getLoopCheckbox,
};

module.exports = { LoopComponentUtils };
