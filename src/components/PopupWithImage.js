import Popup from '../components/Popup.js'


export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupImgZoomTitle = document.querySelector('.popup__title_img');
        this._popupImgZoomPhoto = document.querySelector('.popup__img');

    }

    openPopup = (name, link) => {
        this._popupImgZoomTitle.textContent = name;
        this._popupImgZoomPhoto.src = link;

        this._popupImgZoomPhoto.alt = 'Фотография' + ' ' + name;
        super.openPopup(name, link);
    }

    closePopup() {
        super.closePopup();
    }

    _closePopupByEsc() {
        super._closePopupByEsc();
    }

    setEventListeners() {
        this._popupSelector.addEventListener('mousedown', (evt) => {
            if (evt.target.classList.contains('popup_is-opened')) {
              this.closePopup(this._popupSelector);
            }
            if (evt.target.classList.contains('popup__close')) {
              this.closePopup(this._popupSelector);
            }
          })
    }
}