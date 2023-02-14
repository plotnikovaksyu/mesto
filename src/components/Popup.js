export default class Popup {
  constructor(popupSelector) {
    //this._popupSelector = document.querySelector(popupSelector);
    this._popup = document.querySelector(popupSelector);
  }

  //функции открытия и закрытия попапов
  openPopup() {
    this._popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', this._closePopupByEsc);
  }

  closePopup() {
    this._popup.classList.remove('popup_is-opened');
    this._popup.removeEventListener('keydown', this._closePopupByEsc);
  }


  //приватный метод _closePopupByEsc, который содержит логику закрытия попапа клавишей Esc
  _closePopupByEsc = (evt) => {
    if (evt.key === 'Escape') {
      this.closePopup();
    }
  }

  //обработчики закрытия попапов
  setEventListeners() {
   
    this._popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_is-opened')) {
        this.closePopup();
      }
      if (evt.target.classList.contains('popup__close')) {
        this.closePopup();
      }
    })
  }
}

