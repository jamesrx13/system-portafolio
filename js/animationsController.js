const settinsAnimationsController = () => {
    const settingsContent = document.querySelector('.settings-content');
    const settingsMenu = settingsContent.querySelector('.menu-settings');
    const settings = document.querySelector('.settings');

    settingsMenu.querySelector('i').addEventListener('click', () => {
        settings.dispatchEvent(new Event('click'));
    })

    settings.addEventListener('click', () => {
        settingsContent.classList.toggle('open');
        settingsContent.addEventListener('transitionend', e => {
            settings.classList.toggle('close');
        }, { once: true })
    })

}

export { settinsAnimationsController }