async function getLoopDefaultEnable() {
    const local_obj = await browser.storage.local.get().catch(errorLogger);
    return local_obj['youloop-default-enable'];
}

async function setLoopDefaultEnable(checked) {
    await browser.storage.local
        .set({
            'youloop-default-enable': checked,
        })
        .catch(errorLogger);
}

async function sendMessageToActiveTab(msg) {
    const tabs = await browser.tabs
        .query({
            active: true,
            currentWindow: true,
        })
        .catch(errorLogger);

    await browser.tabs.sendMessage(tabs[0].id, msg).catch(errorLogger);
}

function errorLogger(e) {
    console.error(e);
}

const GlobalUtils = {
    getLoopDefaultEnable,
    setLoopDefaultEnable,
    sendMessageToActiveTab,
    errorLogger,
};

module.exports = { GlobalUtils };
