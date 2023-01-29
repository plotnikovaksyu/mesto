import './index.css';
import Card from '../components/Card.js'
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
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js'
import UserInfo from '../components/UserInfo.js'
import PopupWithForm from '../components/PopupWithForm.js';

//попап с увеличенной картинкой
const zoomPopup = new PopupWithImage('.popup_img')
zoomPopup.setEventListeners()

//открыть попап с увеличенной картинкой
function handleOpenPopup(link, name) {
  zoomPopup.openPopup(name, link)
}




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
  profileValidtion.resetValidation();
})

//открытие попапа для добаления карточки
popupAddOpenButtonElement.addEventListener('click', () => {
  popupAddForm.openPopup();
  cardsValidtion.resetValidation()
})


//попап с добавлением карточки
const popupAddForm = new PopupWithForm({
  submit: (values) => {
    cardList.addItem(createCard({name: values.place, link: values.img}));
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
const cardsValidtion = new FormValidator(formValid, formAddElement)
cardsValidtion.enableValidation()