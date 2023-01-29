import Popup from '../components/Popup.js'


export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupImgZoomTitle = this._popup.querySelector('.popup__title_img');
        this._popupImgZoomPhoto = this._popup.querySelector('.popup__img');

    }

    openPopup = (name, link) => {
        this._popupImgZoomTitle.textContent = name;
        this._popupImgZoomPhoto.src = link;

        this._popupImgZoomPhoto.alt = 'Фотография' + ' ' + name;
        super.openPopup();
    }
}