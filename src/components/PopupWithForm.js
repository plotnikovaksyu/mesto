import Popup from '../components/Popup.js'

export default class PopupWithForm extends Popup {
    constructor({ submit }, popupSelector) {
        super(popupSelector);
        this._inputs = [...this._popup.querySelectorAll('.popup__input')];
        this._inputForm = this._popup.querySelector('.popup__form');
        this._submit = submit;
        this._submitButton = this._popup.querySelector('.popup__submit-button');
        this._submitButtonText = this._submitButton.textContent;
        
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

    renderLoading(isLoading, loadingText = 'Сохранение...') {
        if (isLoading) {
            this._submitButton.textContent = loadingText;
        }
        else {
            this._submitButton.textContent = this._submitButtonText;
        }
    }


//добавлять данные профайла в инпуты
    setInputValues(data) {
        this._inputs.forEach((input) => {
           input.value = data[input.name];
        })
    }
}

