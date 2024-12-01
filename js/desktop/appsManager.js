const AppsManager = () => {
    const appsContainer = document.querySelector('.desktop-apps');
    const apps = Array.from(appsContainer.children);
    const desktopMarker = document.createElement('div');
    const containerRect = appsContainer.getBoundingClientRect();
    const padding = 20;
    const appWidth = 100;
    const appHeight = 100;
    const cols = Math.floor(containerRect.width / (appWidth + padding));

    let initialSelection = null;
    let isDragging = false;
    let currentApp = null;
    let offsetX = 10;
    let offsetY = 10;

    desktopMarker.classList.add('desktopMarker');
    appsContainer.appendChild(desktopMarker);

    // Se organizan las apps como grilla
    apps.forEach((app, index) => {
        const row = Math.floor(index / cols);
        const col = index % cols;
        const x = col * (appWidth + padding);
        const y = row * (appHeight + padding);
        app.style.left = `${x + 10}px`;
        app.style.top = `${y + 10}px`;
    });

    const snapToGrid = (value, size) => Math.round(value / size) * size;

    // Manejo del evento mousedown
    const onMouseDown = (event) => {
        currentApp = event.currentTarget;
        isDragging = true;
        const { left, top } = currentApp.getBoundingClientRect();
        const { clientX, clientY } = event;

        offsetX = clientX - left;
        offsetY = clientY - top;
        currentApp.style.zIndex = 1000;
        document.body.style.cursor = 'grabbing';

        document.addEventListener('mouseup', onMouseUp);
    };

    // Manejo del evento mousemove
    const onMouseMove = (event) => {
        if (!isDragging || !currentApp) return;

        const { clientX, clientY } = event;
        let x = clientX - containerRect.left - offsetX;
        let y = clientY - containerRect.top - offsetY;

        x = Math.max(0, Math.min(containerRect.width - appWidth, x));
        y = Math.max(0, Math.min(containerRect.height - appHeight, y));

        x = snapToGrid(x, appWidth + padding);
        y = snapToGrid(y, appHeight + padding);

        currentApp.style.left = `${x + 10}px`;
        currentApp.style.top = `${y + 10}px`;
    };

    // Manejo del evento mouseup
    const onMouseUp = () => {
        if (isDragging) {
            isDragging = false;
            if (currentApp) {
                currentApp.style.zIndex = '';
                currentApp = null;
            }
            document.body.style.cursor = '';
        }
        document.removeEventListener('mouseup', onMouseUp);
    };

    // Adjuntar eventos a cada app
    apps.forEach((app) => {
        app.addEventListener('mousedown', onMouseDown);
    });

    // Eventos globales para manejar el drag & drop
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    // Contenedor
    document.addEventListener('mousedown', (e) => {
        if (e.target.classList && e.target.classList.contains('app')) {
            addSelectedApp(e.target);
        }
        if (e.target.parentElement && e.target.parentElement.classList.contains('app')) {
            addSelectedApp(e.target.parentElement);
        }
        if (e.target.classList && e.target.classList.contains('desktop-apps')) {
            apps.forEach(app => {
                app.classList.remove('isSelected');
            });
            cursorWatcher(e);
        }
    });

    const moveCursor = (e) => {
        const { clientX, clientY } = e;

        const deltaX = clientX - initialSelection.clientX;
        const deltaY = clientY - initialSelection.clientY;
        const width = Math.abs(deltaX);
        const height = Math.abs(deltaY);
        const translateX = deltaX < 0 ? clientX : initialSelection.clientX;
        const translateY = deltaY < 0 ? clientY : initialSelection.clientY;

        desktopMarker.style.width = `${width}px`;
        desktopMarker.style.height = `${height}px`;
        desktopMarker.style.transform = `translate(${translateX}px, ${translateY}px)`;
    };

    const cursorWatcher = (evt) => {
        initialSelection = evt;
        appsContainer.addEventListener('mousemove', moveCursor);
    };

    window.addEventListener('mouseup', (e) => {
        appsContainer.removeEventListener('mousemove', moveCursor);
        desktopMarker.style.width = `0px`;
        desktopMarker.style.height = `0px`;
        desktopMarker.style.transform = `translate(0px, 0px)`;
        initialSelection = null;
        onMouseUp();
    });

    // Apps
    apps.forEach(app => {
        app.addEventListener('dblclick', () => {
            console.log('double click');
        });
    });

    const addSelectedApp = (app) => {
        app.classList.add('isSelected');
    };

};

export { AppsManager };
