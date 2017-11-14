let timeoutId;
function debounce(func, time) {
    if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = undefined;
    }
    timeoutId = setTimeout(func, time);
}
const rectangle = {
    element: selectBox,
    isVisible: false,
    posX: 0,
    posY: 0
}
document.addEventListener('mousedown', function (e) {
    const { clientX, clientY } = e;
    if (!rectangle.isVisible) {
        selectBox.classList.add('displayed');

        rectangle.posX = clientX;
        rectangle.posY = clientY;

        console.log(`clientX ${clientX}, clientY ${clientY}`);

        rectangle.element.style.left = `${clientX}px`;
        rectangle.element.style.top = `${clientY}px`;

        rectangle.isVisible = true;
    }
});

document.addEventListener('mousemove', (e) => {
    if (selection.isVisible) {
        const { clientX, clientY } = e;
        debounce(() => {
            let width = clientX - rectangle.posX;
            let height = clientY - rectangle.posY;
            rectangle.element.style.width = `${width}px`;
            rectangle.element.style.height = `${height}px`;
        }, 10);
    }
});


document.addEventListener('mouseup', (e) => {
    selection.isVisible = false;
rectangle.element.style.left = `0px`;
rectangle.element.style.top = `0px`;
rectangle.element.style.width = `0px`;
rectangle.element.style.height = `0px`;
rectangle.posX = 0;
rectangle.posY = 0;
selectBox.classList.remove('displayed');
});