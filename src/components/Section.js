export default class Section {
    constructor({ renderer }, containerSelector) {
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);

    }


     //метод, который отвечает за отрисовку всех элементов 
    rendererItems(items) {
        items.forEach(item => {
            this._renderer(item);
        });
    };

    // метод, который принимает DOM-элемент и добавляет его в контейнер
    addItem(element) {
        this._container.prepend(element);
    };
}