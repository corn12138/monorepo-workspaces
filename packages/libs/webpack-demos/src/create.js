

export default () => {
    const element = document.createElement('h1');
    element.textContent = 'Hello world';
    element.addEventListener('click', () => {
        alert('Hello webpack');
    });
    return element;
}