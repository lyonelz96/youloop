const GlobalUtils = {
    getLoopDefaultEnable: async () => {
        const local_obj = await browser.storage.local
            .get()
            .catch(GlobalUtils.errorLogger);
        return local_obj['youloop-default-enable'];
    },
    setLoopDefaultEnable: async (checked) => {
        await browser.storage.local
            .set({
                'youloop-default-enable': checked,
            })
            .catch(GlobalUtils.errorLogger);
    },
    sendMessageToActiveTab: async (msg) => {
        const tabs = await browser.tabs
            .query({
                active: true,
                currentWindow: true,
            })
            .catch(GlobalUtils.errorLogger);

        await browser.tabs
            .sendMessage(tabs[0].id, msg)
            .catch(GlobalUtils.errorLogger);
    },
    errorLogger: (e) => console.error(e),
    getYoutubeVideo: () => document.querySelector('video'),
};

module.exports = { GlobalUtils };
