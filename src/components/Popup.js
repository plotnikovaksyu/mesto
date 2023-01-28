export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = document.querySelector(popupSelector)
    this._popupAddElement = document.querySelector('.popup_add');
    this._popupProfile = document.querySelector('.popup_profile');
  }

  //функции открытия и закрытия попапов
  openPopup() {
    this._popupSelector.classList.add('popup_is-opened');
    document.addEventListener('keydown', this._closePopupByEsc);
  }

  closePopup() {
    this._popupSelector.classList.remove('popup_is-opened');
    this._popupSelector.removeEventListener('keydown', this._closePopupByEsc);
  }


  //приватный метод _closePopupByEsc, который содержит логику закрытия попапа клавишей Esc
  _closePopupByEsc = (evt) => {
    if (evt.key === 'Escape') {
      this.closePopup(this._popupSelector);
    }
  }

  //обработчики закрытия попапов
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

