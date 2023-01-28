import Popup from '../components/Popup.js'

export default class PopupWithForm extends Popup {
    constructor({submit}, popupSelector) {
        super(popupSelector);
        this._inputs = [...document.querySelectorAll('.popup__input')];
        this._inputForm = this._popupSelector.querySelector('.popup__form');
        this._submit = submit;
         this._formProfileElement = document.querySelector('.popup__form');
    }

    openPopup() {
        super.openPopup();
    }

    _getInputValues() {
        this._inputValues = {};
        this._inputs.forEach((input) => {
            this._inputValues[input.name] = input.value
        })
        return this._inputValues
    }

    setEventListeners() {
        super.setEventListeners();
        this._inputForm.addEventListener('submit', (evt) => {
            evt.preventDefault(); //отмена дефолтного поведения, чтобы браузер не перезагрузился
            this._submit(this._getInputValues());
        }) 

    }

    closePopup() {
        super.closePopup();
        this._formProfileElement.reset();
    }

}