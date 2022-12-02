import initialCards from './data.js';

// DOM узлы //
const popupProfile = document.querySelector('.popup_profile');
const popupProfileCloseButtonElement = popupProfile.querySelector('.popup__close_profile');

const popupProfileOpenButtonElement = document.querySelector('.profile__edit-button_profile');

const formProfileElement = popupProfile.querySelector('.popup__form_profile');

const nameInput = popupProfile.querySelector('.popup__input_name');
const discriptionInput = popupProfile.querySelector('.popup__input_discription');
const profileName = document.querySelector('.profile__title');
const profileDiscription = document.querySelector('.profile__discription');

const gridListElement = document.querySelector('.grid__elements');
const gridTemplate = document.querySelector('#grid-template').content.querySelector('.grid__list');

const popupAddElement = document.querySelector('.popup_add');
const popupAddOpenButtonElement = document.querySelector('.profile__add-button');
const popupCloseButtonAddElemen = document.querySelector('.popup__close_add');

const formAddElement = document.querySelector('.popup__form_add');
console.log(formAddElement)
const popupImgZoomElement = document.querySelector('.popup_img');
const popupImgZoomTitle = document.querySelector('.popup__title_img');
const popupImgZoomPhoto = document.querySelector('.popup__img');
const popupImgZoomClose = document.querySelector('.popup__close_img');


//функции на открытие и закрытие попапов
const openPopup = function (item) {
  item.classList.add('popup_is-opened');
}

const closePopup = function (item) {
  item.classList.remove('popup_is-opened');
}

const openPopupProfile = function () {
  nameInput.value = profileName.textContent;
  discriptionInput.value = profileDiscription.textContent;
  openPopup(popupProfile)
}

//const closePopupByClickOverlay = function (evt) {
  //console.log(evt.target, evt.currentTarget);
  //if (evt.target !== evt.currentTarget) {
    //return;
  //}
  //closePopup('popup_is-opened')
//}

//обработчики событий 
popupProfileOpenButtonElement.addEventListener('click', openPopupProfile);
popupAddOpenButtonElement.addEventListener('click', function () {
  openPopup(popupAddElement)
});

popupProfileCloseButtonElement.addEventListener('click', function () {
  closePopup(popupProfile)
});
popupCloseButtonAddElemen.addEventListener('click', function () {
  closePopup(popupAddElement)
});

//popupProfile.addEventListener('click', closePopupByClickOverlay);
//popupAddElement.addEventListener('click', closePopupByClickOverlay);
//popupImgZoomElement.addEventListener('click', closePopupByClickOverlay);

// Обработчик «отправки» формы для профайла
function formSubmitHandler(evt) {
  evt.preventDefault(); //отмена дефолтного поведения, чтобы браузер не перезагрузился
  profileName.textContent = nameInput.value;
  profileDiscription.textContent = discriptionInput.value;
  closePopup(popupProfile);
}
formProfileElement.addEventListener('submit', formSubmitHandler);

// функция поставить и удалить лайк
const handelClickLikeButton = function (evt) {
  evt.target.classList.toggle('grid__fill');
}

//функция удалить элемент
const handelDeleteGridElement = function (evt) {
  evt.target.closest('.grid__list').remove();
}

// создание карточки через template 
const createCard = function (item) {
  const grid = gridTemplate.cloneNode(true)

  const gridTitle = grid.querySelector('.grid__title')
  const gridImg = grid.querySelector('.grid__image')
  const gridLikeButton = grid.querySelector('.grid__like-button')
  const gridDeleteButton = grid.querySelector('.grid__delete-button')

  gridLikeButton.addEventListener('click', handelClickLikeButton);
  gridDeleteButton.addEventListener('click', handelDeleteGridElement);


  gridTitle.textContent = item.name;
  gridImg.src = item.link;

  gridImg.addEventListener('click', function () {
    openPopup(popupImgZoomElement)
    popupImgZoomTitle.textContent = gridTitle.textContent;
    popupImgZoomPhoto.src = gridImg.src;
  })

  return grid;
}
//обработчик для закрытия zoom через кнопку Х
popupImgZoomClose.addEventListener('click', function () {
  closePopup(popupImgZoomElement);
});

const placeInput = document.querySelector('.popup__input_place');
const imgInput = document.querySelector('.popup__input_img');



//добавление карточек
const renderGridElement = function (item) {
  gridListElement.prepend(createCard(item));
}

//генерация новых карточек 
initialCards.forEach(function (item) {
  renderGridElement(item);
});



function cardSubmitHandler(evt) {
  evt.preventDefault(); //отмена дефолтного поведения, чтобы браузер не перезагрузился
  const cards =
    ({
      name: placeInput.value,
      link: imgInput.value
    });

  renderGridElement(cards, gridListElement)

  placeInput.value = '';
  imgInput.value = '';
  closePopup(popupAddElement);
}
formAddElement.addEventListener('submit', cardSubmitHandler);







