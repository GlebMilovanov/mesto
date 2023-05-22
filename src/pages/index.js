/* imports */
import './index.css';
import Section from '../components/Section';
import PopupWithForm from '../components/PopupWithForm';
import PopupWithImage from '../components/PopupWithImage';
import FormValidator from '../components/FormValidator';
import UserInfo from '../components/UserInfo';
import {
  userNameSelector,
  userOccupationSelector,
  cardsContainerSelector,
  cardTemplateSelector,
  imagePopupSelector,
  profilePopupSelector,
  buttonEditProfile,
  buttonAddCard,
  cardPopupSelector,
  profileForm,
  cardForm,
} from '../utils/constants.js';
import validationConfig from '../utils/validationConfig';
import initialCards from '../utils/initialCards';
import { createNewCard } from '../utils/utils.js';

/* set/get user info */
const userInfo = new UserInfo(userNameSelector, userOccupationSelector);

/* image popup */
const imagePopup = new PopupWithImage(imagePopupSelector);
imagePopup.setEventListeners();

/* create initial card list */
const cardsList = new Section(
  {
    data: initialCards,
    renderer: (item) => {
      const newCard = createNewCard(
        item,
        cardTemplateSelector,
        imagePopup.open
      );
      cardsList.addItem(newCard);
    },
  },
  cardsContainerSelector
);
cardsList.renderItems();

/* profile popup */
const profilePopup = new PopupWithForm(profilePopupSelector, (evt) => {
  evt.preventDefault();
  userInfo.setUserInfo(profilePopup.getInputValues());
  profilePopup.close();
});

const profileFormValidation = new FormValidator(validationConfig, profileForm);
profileFormValidation.enableValidation();

buttonEditProfile.addEventListener('click', () => {
  profileFormValidation.resetErrorMessage();
  profilePopup.setInputValue(userInfo.getUserInfo());
  profilePopup.open();
  profilePopup.setEventListeners();
});

/* card popup */

const cardPopup = new PopupWithForm(cardPopupSelector, (evt) => {
  evt.preventDefault();
  const newCardInfo = cardPopup.getInputValues();
  const newCard = createNewCard(
    newCardInfo,
    cardTemplateSelector,
    imagePopup.open
  );
  cardsList.addItem(newCard);
  cardPopup.close();
});

const cardFormValidation = new FormValidator(validationConfig, cardForm);
cardFormValidation.enableValidation();

buttonAddCard.addEventListener('click', () => {
  cardFormValidation.resetErrorMessage();
  cardPopup.open();
  cardPopup.setEventListeners();
});
