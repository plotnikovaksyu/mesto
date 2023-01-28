// объекты для валидации
export const formValid = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_disabled',
    };

// export const templateSelector = {
//     templateSelector: '#grid-template',
// }



// DOM узлы //
export const popupProfile = document.querySelector('.popup_profile');
export const popupProfileOpenButtonElement = document.querySelector('.profile__edit-button_profile');
export const formProfileElement = popupProfile.querySelector('.popup__form_profile');
export const nameInput = popupProfile.querySelector('.popup__input_name');
export const discriptionInput = popupProfile.querySelector('.popup__input_discription');
export const popupAddElement = document.querySelector('.popup_add');
export const placeInput = popupAddElement.querySelector('.popup__input_place');
export const imgInput = popupAddElement.querySelector('.popup__input_img');
export const popupAddOpenButtonElement = document.querySelector('.profile__add-button');
export const formAddElement = document.querySelector('.popup__form_add');