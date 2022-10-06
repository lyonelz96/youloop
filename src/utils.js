async function getLoopDefaultEnable() {
    const local_obj = await browser.storage.local.get();
    return local_obj['youloop-default-enable'];
}

async function setLoopDefaultEnable(checked) {
    await browser.storage.local.set({
        'youloop-default-enable': checked,
    });
}

const GlobalUtils = {
    getLoopDefaultEnable,
    setLoopDefaultEnable,
};

module.exports = { GlobalUtils };
