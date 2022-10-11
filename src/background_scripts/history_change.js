const { GlobalUtils } = require('../utils');

browser.webNavigation.onHistoryStateUpdated.addListener(async (details) => {
    const url = new URL(details.url);

    if (
        url.origin === 'https://www.youtube.com' &&
        url.pathname === '/watch' &&
        url.search.includes('?v=')
    ) {
        await GlobalUtils.sendMessageToActiveTab({ url_change: true }).catch(
            GlobalUtils.errorLogger
        );
    }
});
