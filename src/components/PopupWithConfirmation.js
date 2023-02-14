import Popup from '../components/Popup.js'

export default class PopuppWithConfirmation extends Popup {
       constructor(popupSelector, submit) {
        super(popupSelector);
        this._submit = submit;
        this._form = this._popup.querySelector('.popup__form');
        this._submitButton = this._popup.querySelector('.popup__submit-button')
        //console.log(popupSelector)
    }

    handelConfirmSubmit = (submit) => {
        this._submit = submit;
    }



    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault(); //отмена дефолтного поведения, чтобы браузер не перезагрузился
            this._submit();
        })
    }

    setSubmitButtonText(text) {
        this._submitButton.textContent = text;
    }
}