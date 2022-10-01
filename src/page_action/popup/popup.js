const default_enable_checkbox = document.querySelector(
    'input[id="loop-default-enable"][type="checkbox"]'
);

async function getLoopDefaultEnable() {
    const local_obj = await browser.storage.local.get();
    return local_obj['loop-default-enable'];
}

async function setLoopDefaultEnable() {
    const checked = await getLoopDefaultEnable();
    default_enable_checkbox.checked = checked ? true : false;
}

default_enable_checkbox.addEventListener('change', async () => {
    await browser.storage.local.set({
        'loop-default-enable': default_enable_checkbox.checked,
    });

    await setLoopDefaultEnable();
});

setLoopDefaultEnable();
