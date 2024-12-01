import { dataDockMenuApps } from "./dockData.js"

const appsList = () => {

    const dockMenu = document.querySelector('.dockMenu');

    dataDockMenuApps.forEach((app, index) => {
        const appItem = document.createElement('div');

        appItem.classList.add('dockItem');

        appItem.innerHTML = `
            <div class="itemContent">
                <i style="color: ${app.color || 'gray'}" class="${app.icon}"></i>
                <span>${app.name}</span>
            </div>
        `;

        appItem.addEventListener('click', () => {
            app.action();
        })

        dockMenu.appendChild(appItem);

    });

}

export {
    appsList
}