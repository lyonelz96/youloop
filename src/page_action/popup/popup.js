const default_enable_checkbox = document.querySelector(
    'input[id="youloop-default-enable"][type="checkbox"]'
);

async function getLoopDefaultEnable() {
    const local_obj = await browser.storage.local.get();
    return local_obj['youloop-default-enable'];
}

async function setLoopDefaultEnable() {
    const checked = await getLoopDefaultEnable();
    default_enable_checkbox.checked = checked ? true : false;
}

default_enable_checkbox.addEventListener('change', async () => {
    await browser.storage.local.set({
        'youloop-default-enable': default_enable_checkbox.checked,
    });

    await setLoopDefaultEnable();
});

setLoopDefaultEnable();

const toggle_btn = document.querySelector('#youloop-toggle-btn');

toggle_btn.addEventListener('click', async () => {
    const tabs = await browser.tabs.query({
        active: true,
        currentWindow: true,
    });

    browser.tabs.sendMessage(tabs[0].id, {
        toggle: true,
    });
});
