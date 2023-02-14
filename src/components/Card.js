class Card {
    constructor({ userId, templateSelector,  handleDeleteClick, handleLikeClick,}, data, handleOpenPopup) {
        this._userId = userId;
        this._handleDeleteClick = handleDeleteClick;
        this._handleLikeClick = handleLikeClick;
        this._name = data.name;
        this._link = data.link;
        this._id = data._id;
        this._owner = data.owner._id;
        this._likes = data.likes;
        this._templateSelector = templateSelector;
        this._handleOpenPopup = handleOpenPopup;
        this._element = this._getTemplate();
        this._deleteButton = this._element.querySelector('.grid__delete-button');
        this._likeButton = this._element.querySelector('.grid__like-button');
        this._gridImage = this._element.querySelector('.grid__image');
        this._gridTitle = this._element.querySelector('.grid__title');
        this._likeLength = this._element.querySelector('.griid__counter');
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
        this._setEventListeners();

        this._gridImage.src = this._link;
        this._gridTitle.textContent = this._name;
        this._gridImage.alt = 'Фотография' + ' ' + this._name;

        if (this._owner !== this._userId) {
            this._deleteButton.remove()
        }

        this._likeLength.textContent = this._likes.length;

        if (this.isLikedByMe()) {
            this._likeButton.classList.add('grid__fill');
        }

        return this._element;
    }

    //поставить лайк
    putLike = (like) => {
        this._likeButton.classList.add('grid__fill');
        this._likeLength.textContent = like;
    }
    //удалить лайк
    deleteLike = (like) => {
        this._likeButton.classList.remove('grid__fill');
        this._likeLength.textContent = like;
    }


    //функция удалить элемент
    handelDeleteGridElement = () => {
        this._element.remove();
        this._element = null;
    }


    //проверка наличиe лайка
    isLikedByMe() {
        const cardWithLike = this._likes.find((like) => like._id === this._userId);
        return cardWithLike;
    }


    //набор обработчиков событий
    _setEventListeners() {
        this._likeButton.addEventListener('click', () => {
            this._handleLikeClick(this._id)
        });

        this._deleteButton.addEventListener('click', () => {
            this._handleDeleteClick(this._id)
        });

        this._gridImage.addEventListener('click', () => {
            this._handleOpenPopup(this._link, this._name)
        })
    }

}

export default Card;