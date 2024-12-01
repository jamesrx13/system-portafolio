import { settings } from "./dockFuntions.js"

const dataDockMenuApps = [
    {
        name: 'App Name',
        icon: 'bi bi-gear',
        color: 'white',
        action: () => {
            settings();
        }
    },
]

export {
    dataDockMenuApps
}