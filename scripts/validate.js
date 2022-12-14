// функция проверки на валидность
const checkInputValidity = (input) => {
    const error = document.querySelector(`#${input.id}-error`);
    if (input.validity.valid) {
        error.textContent = ''
    }
    else {
        error.textContent = input.validationMessage
    }
}


// функция включения и отключения кнопки сохранить
toggleSubmitButton = (inpus, submitButton, objects) => {

    const isFormValid = inpus.every(input => {
        return input.validity.valid
    })
    if (isFormValid) {
        submitButton.classList.remove(objects.inactiveButtonClass)
        submitButton.disabled = ''
    }
    else {
        submitButton.classList.add(objects.inactiveButtonClass)
        submitButton.disabled = 'disabled'
    }
}


// функция обработки всех форм и активации валидации
const enableValidation = (objects) => {
    
    const forms = [...document.querySelectorAll(objects.formSelector)];
    
    forms.forEach(form => {
        const inpus = [...form.querySelectorAll(objects.inputSelector)]; //nodeList в массив
        const submitButton = form.querySelector(objects.submitButtonSelector);
        form.addEventListener('submit', (evt) => {
            evt.preventDefault();    
        })

        inpus.forEach(input => {
            input.addEventListener('input', () => {
                checkInputValidity(input)
                toggleSubmitButton(inpus, submitButton, objects)
            })
        })
    })  
}


enableValidation ({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_disabled',
  });