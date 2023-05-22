/* page */
export const userNameSelector = '.profile__name';
export const userOccupationSelector = '.profile__occupation';
export const cardsContainerSelector = '.elements__container';
export const cardTemplateSelector = '.element-template';
export const buttonEditProfile = document.querySelector('.profile__edit-btn');
export const buttonAddCard = document.querySelector('.profile__add-btn');

/* popups */
export const popupSelector = '.popup';

/* profile popup */
export const profilePopupSelector = '.popup_type_profile';
export const profileForm = document.querySelector('.popup__form_type_profile');

/* card popup */
export const cardPopupSelector = '.popup_type_card';
export const cardForm = document.querySelector('.popup__form_type_card');

/* image popup */
export const imagePopupSelector = '.popup_type_image';

export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Сахалин',
    link: 'https://images.unsplash.com/photo-1662953594079-a43b3767aca5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2787&q=80',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
];
