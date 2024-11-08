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

const dockAnimationsController = () => {
    const dockItems = document.querySelectorAll('.dockItem');
    dockItems.forEach((item, index) => {

        item.addEventListener('mouseover', () => {
            if (index > 0) {
                dockItems[index - 1].style.transform = 'translateY(-7px)';
            }
            if (index < dockItems.length - 1) {
                dockItems[index + 1].style.transform = 'translateY(-7px)';
            }
        });

        item.addEventListener('mouseout', () => {
            item.style.transform = '';
            if (index > 0) {
                dockItems[index - 1].style.transform = '';
            }
            if (index < dockItems.length - 1) {
                dockItems[index + 1].style.transform = '';
            }
        });
    });
}

export {
    settinsAnimationsController,
    dockAnimationsController
}