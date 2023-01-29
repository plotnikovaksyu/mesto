class Card {
    constructor(name, link, templateSelector, handleOpenPopup) {
        this._name = name;
        this._link = link;
        this._templateSelector = templateSelector;
        this._handleOpenPopup = handleOpenPopup;
    }
   
    //получаем разметку из темплейта
    _getTemplate() {
        const cardElement = document
            .querySelector(this._templateSelector)
            .content
            .querySelector('.grid__list')
            .cloneNode(true);
            
        //возвращаем DOM-элемент карточки
        return cardElement;
    }

    
    //перенести поля data в темплейт 
    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();

       
        this._gridImage.src = this._link;
        this._gridTitle.textContent = this._name;
        this._gridImage.alt = 'Фотография' + ' ' + this._name;
       
        
        return this._element;
    }

    //набор обработчиков событий
    _setEventListeners() {
        this._likeButton = this._element.querySelector('.grid__like-button');
        this._deleteButton = this._element.querySelector('.grid__delete-button');
        this._gridImage = this._element.querySelector('.grid__image');
        this._gridTitle = this._element.querySelector('.grid__title')


        this._likeButton.addEventListener('click', () => {
            this._handelClickLikeButton()
        });

        this._deleteButton.addEventListener('click', () => {
            this._handelDeleteGridElement()
        });


        this._gridImage.addEventListener('click', () => {
            this._handleOpenPopup(this._link, this._name)
        })
    }
  

    // функция поставить и удалить лайк
    _handelClickLikeButton = () => {
        this._likeButton.classList.toggle('grid__fill');

    }

    //функция удалить элемент
    _handelDeleteGridElement = () => {
        this._element.remove();
        this._element = null;
    }
}

export default Card;