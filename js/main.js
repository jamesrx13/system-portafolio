import { settinsAnimationsController, dockAnimationsController } from "./animationsController.js";
import { appsList } from "./dock/dockController.js";

document.addEventListener('DOMContentLoaded', () => {
    // Animaciones
    settinsAnimationsController();
    // Dock Menu
    appsList();
    dockAnimationsController();
})