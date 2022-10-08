async function getLoopDefaultEnable() {
    const local_obj = await browser.storage.local.get().catch(errorLogger);
    return local_obj['youloop-default-enable'];
}

async function setLoopDefaultEnable(checked) {
    await browser.storage.local.set({
        'youloop-default-enable': checked,
    }).catch(errorLogger);
}

function errorLogger(e) {
    console.error(e);
}

const GlobalUtils = {
    getLoopDefaultEnable,
    setLoopDefaultEnable,
    errorLogger,
};

module.exports = { GlobalUtils };
