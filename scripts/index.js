// открытие и закрытие попапа 
const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close');
const popupSubmitButtonElement = popupElement.querySelector('.popup__submit-button');

const popapOpenButtonElement = document.querySelector('.profile__edit-button');

const openPopup = function () {
    popupElement.classList.add('popup_is-opened');
}

const closePopup = function () {
    popupElement.classList.remove('popup_is-opened');
}

const closePopupByClickOverlay = function (event) {
    console.log(event.target, event.currentTarget);
    if (event.target !== event.currentTarget) {
        return;
    }
    closePopup();
}

// обработчик событий открытия и закрытия 
popapOpenButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);
popupElement.addEventListener('click', closePopupByClickOverlay);

// сохранение и изменения текста в редактируемых полях

const formElement = popupElement.querySelector('.popup__form');

const nameInput = popupElement.querySelector('.popup__edit-name');
const discriptionInput = popupElement.querySelector('.popup__edit-discription');
const profileName = document.querySelector('.profile__title');
const profileDiscription = document.querySelector('.profile__discription');



popupElement.querySelector('input[name="name"]').value = profileName.textContent;
popupElement.querySelector('input[name="discription"]').value = profileDiscription.textContent;
// Обработчик «отправки» формы
 
function formSubmitHandler (evt) {
    evt.preventDefault(); //отмена дефолтного поведения, чтобы браузер не перезагрузился
    profileName.textContent = nameInput.value;
    profileDiscription.textContent = discriptionInput.value;
    closePopup();
}

formElement.addEventListener('submit', formSubmitHandler); 


//поставить и убрать лайк только для первого элемента

let likeButtonElement = document.querySelector('.grid__button-img');

console.log(likeButtonElement.length);

const getLike = function () {
  likeButtonElement.classList.toggle('grid__fill');
}

//обработчик сбытий

likeButtonElement.addEventListener ('click', getLike);


