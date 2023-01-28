import './index.css';
import Card from '../components/card.js'
import initialCards from '../utils/data.js';
import {
  formValid,
  //popupProfile,
  popupProfileOpenButtonElement,
  formProfileElement,
  nameInput,
  discriptionInput,
 // popupAddElement,
  placeInput,
  imgInput,
  popupAddOpenButtonElement,
  formAddElement
} from '../utils/constants.js';
import FormValidator from '../components/formValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js'
import UserInfo from '../components/UserInfo.js'
import PopupWithForm from '../components/PopupWithForm.js';



//открыть попап с увеличенной картинкой
function handleOpenPopup(link, name) {
  const zoomPopup = new PopupWithImage('.popup_img')
  zoomPopup.openPopup(name, link)
}

//закрыть попап с увеличенной картинкой
const zoomPopup = new PopupWithImage('.popup_img')
zoomPopup.setEventListeners()


//инфа о пользователе на странице
const userInfo = new UserInfo({
  name: '.profile__title',
  discription: '.profile__discription'
})


//создание карточек
function createCard(item) {
  const card = new Card(item.name, item.link, '#grid-template', handleOpenPopup);
  const cardElement = card.generateCard();
  return cardElement
}


//отрисовка карточек из списка
const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    cardList.addItem(createCard(item));
  }
},
  '.grid__elements'
);

cardList.rendererItems();

//попап с описанием профиля
const popupProfileForm = new PopupWithForm({
  submit: (info) => {
    userInfo.setUserInfo(info);
    popupProfileForm.closePopup();
  }
},
  '.popup_profile'

)

popupProfileForm.setEventListeners()



//открытие попапа редактирования профиля с существующими значениями
popupProfileOpenButtonElement.addEventListener('click', () => {
  const profile = userInfo.getUserInfo()
  nameInput.value = profile.name;
  discriptionInput.value = profile.discription;
  popupProfileForm.openPopup()
  //popupProfileForm.resetValidation();
})

//открытие попапа для добаления карточки
popupAddOpenButtonElement.addEventListener('click', () => {
  popupAddForm.openPopup()
})





//попап с добавлением карточки
const popupAddForm = new PopupWithForm({
  submit: () => {
    const inputItems = userInfo.getUserInfo()
    inputItems.name = placeInput.value,
      inputItems.link = imgInput.value
    cardList.addItem(createCard(inputItems));
    formAddElement.reset() //сбрасываем поля
    popupAddForm.closePopup();
  }
},
  '.popup_add')

popupAddForm.setEventListeners()



//валидация профайла
const profileValidtion = new FormValidator(formValid, formProfileElement)
profileValidtion.enableValidation()

//валидация добавления карточки
const addValidtion = new FormValidator(formValid, formAddElement)
addValidtion.enableValidation()