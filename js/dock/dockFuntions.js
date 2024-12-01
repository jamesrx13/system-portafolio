const settings = () => {
    document.querySelector('.settings').dispatchEvent(new Event('click'));
}

export {
    settings
}