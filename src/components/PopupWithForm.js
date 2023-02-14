import Popup from '../components/Popup.js'

export default class PopupWithForm extends Popup {
    constructor({submit}, popupSelector) {
        super(popupSelector);
        this._inputs = [...this._popup.querySelectorAll('.popup__input')];
        this._inputForm = this._popup.querySelector('.popup__form');
        this._submit = submit;
        this._submitButton = this._popup.querySelector('.popup__submit-button')
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
        this._inputForm.reset();
    }

    setSubmitButtonText(text) {
        this._submitButton.textContent = text;
    }
}