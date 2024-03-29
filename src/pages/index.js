import './index.css';
import Card from '../components/Card.js'
// import initialCards from '../utils/data.js';
import {
  formValid,
  popupProfileOpenButtonElement,
  popupAddOpenButtonElement,
  avatarPopupOpenButton,
} from '../utils/constants.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js'
import UserInfo from '../components/UserInfo.js'
import PopupWithForm from '../components/PopupWithForm.js';
import { api } from '../components/Api.js'
import PopuppWithConfirmation from '../components/PopupWithConfirmation.js'



//общий запрос для отрисовки карточек и загрузки данных пользователя
Promise.all([api.getUserData(), api.getInitialCards()])
  .then(([res, cards]) => {
    userInfo.setUserInfo(res)
    cardList.rendererItems(cards)
  })
  .catch((err) => {
    console.log((`${err}`))
  })


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
  about: '.profile__discription',
  avatar: '.profile__avatar',
})

//функция отрисовки карточек
function createCard(data) {
  const card = new Card(
    {
      userId: userInfo.returnMyId(),
      templateSelector: '#grid-template',
      
      handleDeleteClick: (_id) => { //подтверждение удаления карточки через попап
        popupDeleteCards.openPopup()
        popupDeleteCards.handelConfirmSubmit(() => {
          popupDeleteCards.setSubmitButtonText('Удаление...')
          api.deleteCard(_id)
            .then(() => {
              card.handelDeleteGridElement()
              popupDeleteCards.closePopup()
            })
            .catch((err) => {
              console.log((`${err}`))
            })
            .finally(() => {
              popupDeleteCards.setSubmitButtonText('Да')
            })
        })
      },
      handleLikeClick: (_id) => {
        if (card.isLikedByMe()) { //удалить лайк
          api.deleteLike(_id)
            .then((res) => {
              card.deleteLike(res.likes.length)
            })
            .catch((err) => {
              console.log((`${err}`))
            })
        }
        else { //поставить лайк
          api.setLike(_id)
            .then((res) => {
              card.putLike(res.likes.length)
            })
            .catch((err) => {
              console.log((`${err}`))
            })
        }

      },
    },
    data,
    handleOpenPopup,
  );

  const cardElement = card.generateCard();
  return cardElement
}



const cardList = new Section({
  renderer: (item) => {
    cardList.addItem(createCard(item));
  }
},
  '.grid__elements'
);


//открытие попапа редактирования профиля с существующими значениями
popupProfileOpenButtonElement.addEventListener('click', () => {
  const profile = userInfo.getUserInfo()
  popupProfileForm.setInputValues(profile)
  // nameInput.value = profile.name;
  // discriptionInput.value = profile.about;
  popupProfileForm.openPopup()
  formValidators['form-edit'].resetValidation()
})


//попап с описанием профиля
const popupProfileForm = new PopupWithForm({
  submit: (info) => {
    popupProfileForm.renderLoading(true)

    api.editProfilePopup(info)
      .then((res) => {
        userInfo.setUserInfo(res);
        popupProfileForm.closePopup();
      })
      .catch((err) => {
        console.log((`${err}`))
      })
      .finally(() => {
        popupProfileForm.renderLoading(false)
      })
  }
},
  '.popup_profile'
)

popupProfileForm.setEventListeners()



//открытие попапа для добаления карточки
popupAddOpenButtonElement.addEventListener('click', () => {
  popupAddForm.openPopup();
  formValidators['form-add'].resetValidation()
})



//попап с добавлением карточки
const popupAddForm = new PopupWithForm({
  submit: (values) => {
    popupAddForm.renderLoading(true)
    api.addNewCard(values)
      .then((res) => {
        cardList.addItem(createCard(res));
        popupAddForm.closePopup();
      })

      .catch((err) => {
        console.log((`${err}`))
      })
      .finally(() => {
        popupAddForm.renderLoading(false)
      })
  }
},
  '.popup_add')

popupAddForm.setEventListeners()




//открытие попапапа для редактирования аватара
avatarPopupOpenButton.addEventListener('click', () => {
  avatarPopup.openPopup();
  formValidators['form-avatar'].resetValidation()
})

//создание экземпляра класса для редактирования аватара
const avatarPopup = new PopupWithForm({
  submit: (info) => {
    avatarPopup.renderLoading(true)
    api.updateAvatar(info)
      .then((res) => {
        userInfo.setUserInfo(res);
        avatarPopup.closePopup();
      })

      .catch((err) => {
        console.log((`${err}`))
      })
      .finally(() => {
        avatarPopup.renderLoading(false)
      })
  }
}, '.popup_avatar')

avatarPopup.setEventListeners()




//создание класса попап для подтверждения удаления
const popupDeleteCards = new PopuppWithConfirmation('.popup_checking')

popupDeleteCards.setEventListeners()



// //валидация профайла

const formValidators = {}

// Включение валидации
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(formValid, formElement)
// получаем данные из атрибута `name` у формы
    const formName = formElement.getAttribute('name')

   // вот тут в объект записываем под именем формы
    formValidators[formName] = validator;
   validator.enableValidation();
  });
};

enableValidation(formValid);