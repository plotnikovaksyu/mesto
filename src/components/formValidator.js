class FormValidator {
    constructor(formValid, formElement) {
        this._formSelector = formValid.formSelector;
        this._inputSelector = formValid.inputSelector;
        this._submitButtonSelector = formValid.submitButtonSelector;
        this._inactiveButtonClass = formValid.inactiveButtonClass;
        this._formElement = formElement;
        this._submitButton = this._formElement.querySelector(this._submitButtonSelector);
        this._inputsList = [... this._formElement.querySelectorAll(this._inputSelector)]; //nodeList в массив
        //this._error = document.querySelector(`#${input.id}-error`);
    }

    // функция проверки на валидность
    _checkInputValidity = (input) => {
        const error = document.querySelector(`#${input.id}-error`);
        if (input.validity.valid) {
            error.textContent = ''
        }
        else {
            error.textContent = input.validationMessage
        }
    }



    // функция включения и отключения кнопки сохранить
    _toggleSubmitButton = (inputs) => {

        const isFormValid = inputs.every(input => {
            return input.validity.valid
        })
        if (isFormValid) {
            this._submitButton.classList.remove(this._inactiveButtonClass)
            this._submitButton.disabled = ''
        }
        else {
            this._toggleButtonState()
        }
    }


    // функция обработки всех форм и активации валидации
    _setEventListeners = () => {


        this._inputsList.forEach(input => {
            input.addEventListener('input', () => {
                this._checkInputValidity(input)
                this._toggleSubmitButton(this._inputsList)
            })
        })


    }

    _toggleButtonState = (evt) => {
        this._submitButton.classList.add(this._inactiveButtonClass)
        this._submitButton.disabled = 'disabled'
    }

    //  _hideError = (input) => {
    //     // const error = document.querySelector(`#${input.id}-error`);
    //     // error.textContent = ''
    //     console.log('test')
    // }



    // //вызвать там, где навешиваем обраотчик открытия попапа
    // resetValidation() {
    //     this._toggleButtonState(); //<== управляем кнопкой ==

    //     this._inputList.forEach((inputElement) => {
    //         this._hideError(inputElement) //<==очищаем ошибки ==
    //     });
    // }


    enableValidation = () => {
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._toggleButtonState(evt);
        })

        this._setEventListeners()
    }
}


export default FormValidator;