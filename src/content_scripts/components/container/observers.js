const { GlobalUtils } = require('../../../utils');
const { Utils } = require('./utils');

const OnVideoChange = {
    build: () => {
        return new MutationObserver((mutationList) => {
            for (const mutation of mutationList) {
                if (
                    mutation.type === 'attributes' &&
                    mutation.attributeName === 'src'
                ) {
                    Utils.remove();
                    Utils.insert();
                }
            }
        });
    },
    observe: (
        observer = OnVideoChange.build(),
        target = GlobalUtils.getYoutubeVideo(),
        config = { attributes: true }
    ) => {
        OnVideoChange.get = () => observer;
        observer.observe(target, config);
    },
    disconnect: () => {
        OnVideoChange.get().disconnect();
    },
};

function addInitialObservers() {
    const observers = [OnVideoChange];

    for (const observer of observers) {
        observer.observe();
    }
}

function disconnectAllObservers() {
    const observers = [OnVideoChange];

    for (const observer of observers) {
        observer.disconnect();
    }
}

const Observers = { addInitialObservers, disconnectAllObservers };

module.exports = { Observers };
