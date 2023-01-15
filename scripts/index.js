import Card from './card.js'
import initialCards from './data.js';
import {formValid} from './config.js'
import FormValidator from './formValidator.js'


// DOM узлы //
const popups = [...document.querySelectorAll('.popup')];
const popupProfile = document.querySelector('.popup_profile');

const popupProfileOpenButtonElement = document.querySelector('.profile__edit-button_profile');

const formProfileElement = popupProfile.querySelector('.popup__form_profile');

const nameInput = popupProfile.querySelector('.popup__input_name');
const discriptionInput = popupProfile.querySelector('.popup__input_discription');
const profileName = document.querySelector('.profile__title');
const profileDiscription = document.querySelector('.profile__discription');

const popupAddElement = document.querySelector('.popup_add');
const popupAddOpenButtonElement = document.querySelector('.profile__add-button');

const formAddElement = document.querySelector('.popup__form_add');

const placeInput = document.querySelector('.popup__input_place');
const imgInput = document.querySelector('.popup__input_img');

const popupImgZoomElement = document.querySelector('.popup_img');
const popupImgZoomTitle = document.querySelector('.popup__title_img');
const popupImgZoomPhoto = document.querySelector('.popup__img');


const gridListElement = document.querySelector('.grid__elements')

//функции на открытие и закрытие попапов
const openPopup = function (item) {
  item.classList.add('popup_is-opened');
  document.addEventListener('keydown', closePopupByEsc);
}

const closePopup = function (item) {
  item.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closePopupByEsc);
}

const openPopupProfile = function () {
  nameInput.value = profileName.textContent;
  discriptionInput.value = profileDiscription.textContent;
  openPopup(popupProfile)
}


// функция закрытия попапа через клавишу Escape 
const closePopupByEsc = (evt) => {
  if (evt.key === 'Escape') {
    const openPopups = document.querySelector('.popup_is-opened');
    closePopup(openPopups);
  }
}


//обработчики событий открытия и закрытия попапов
popupProfileOpenButtonElement.addEventListener('click', openPopupProfile);
popupAddOpenButtonElement.addEventListener('click', function () {
  openPopup(popupAddElement);
  //resetValidation();
});


popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_is-opened')) {
      closePopup(popup);
    }
    if (evt.target.classList.contains('popup__close')) {
      closePopup(popup);
    }
  })
})


// Обработчик «отправки» формы для профайла
function handleProfileFormSubmit(evt) {
  evt.preventDefault(); //отмена дефолтного поведения, чтобы браузер не перезагрузился
  profileName.textContent = nameInput.value;
  profileDiscription.textContent = discriptionInput.value;
  closePopup(popupProfile);
}
formProfileElement.addEventListener('submit', handleProfileFormSubmit);


function handleOpenPopup(link, name) {
 openPopup(popupImgZoomElement)
  popupImgZoomTitle.textContent = name;
  popupImgZoomPhoto.src = link;
  popupImgZoomPhoto.alt = 'Фотография' + ' ' + name;
}

function createCard(item) {
  const card = new Card(item.name, item.link, '#grid-template', handleOpenPopup);
  const cardElement = card.generateCard();
  return cardElement
}

//отрисовка карточек из даты
initialCards.forEach((items) => {
  const newElements = createCard(items);
  gridListElement.prepend(newElements);
})

//отрисовка новых карточек через сабмит
function handleCardsFormSubmit(evt, items) { 
  evt.preventDefault(); //отмена дефолтного поведения, чтобы браузер не перезагрузился
 
  const inputItems =
    ({
      name: placeInput.value,
      link: imgInput.value
    });


  const newAddElemets = createCard(inputItems, items);
  gridListElement.prepend(newAddElemets);

  formAddElement.reset()


  closePopup(popupAddElement);
}

formAddElement.addEventListener('submit', handleCardsFormSubmit);



//валидация профайла
const profileValidtion = new FormValidator(formValid, formProfileElement)
profileValidtion.enableValidation()

//валидация добавления карточки
const addValidtion = new FormValidator(formValid, formAddElement)
addValidtion.enableValidation()

