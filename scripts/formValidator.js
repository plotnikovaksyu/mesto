class FormValidator {
    constructor(formValid, formElement) {
        this._formSelector = formValid.formSelector;
        this._inputSelector = formValid.inputSelector;
        this._submitButtonSelector = formValid.submitButtonSelector;
        this._inactiveButtonClass = formValid.inactiveButtonClass;
        this._formElement = formElement;
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
_toggleSubmitButton = (inputs, submitButton) => {

    const isFormValid = inputs.every(input => {
        return input.validity.valid
    })
    if (isFormValid) {
        submitButton.classList.remove(this._inactiveButtonClass)
        submitButton.disabled = ''
    }
    else {
        submitButton.classList.add(this._inactiveButtonClass)
        submitButton.disabled = 'disabled'
    }
}


// функция обработки всех форм и активации валидации
_setEventListeners = () => {
    
    const forms = [...document.querySelectorAll(this._formSelector)];
    
    forms.forEach(form => {
        const inpus = [...form.querySelectorAll(this._inputSelector)]; //nodeList в массив
        const submitButton = form.querySelector(this._submitButtonSelector);
        

        inpus.forEach(input => {
            input.addEventListener('input', () => {
                this._checkInputValidity(input)
                this._toggleSubmitButton(inpus, submitButton)
            })
        })
    });      
}


enableValidation = () => {
    this._formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();    
    })

    this._setEventListeners()
}
}


export default FormValidator;