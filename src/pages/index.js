/* imports */
import './index.css';
import Section from '../components/Section';
import PopupWithForm from '../components/PopupWithForm';
import PopupWithImage from '../components/PopupWithImage';
import FormValidator from '../components/FormValidator';
import UserInfo from '../components/UserInfo';
import PopupDeleteCard from '../components/PopupDeleteCard';
import Api from '../components/Api';
import {
  userNameSelector,
  userAboutSelector,
  userAvatarSelector,
  cardsContainerSelector,
  cardTemplateSelector,
  imagePopupSelector,
  profilePopupSelector,
  buttonEditProfile,
  buttonAddCard,
  buttonChangeAvatar,
  cardPopupSelector,
  profileForm,
  cardForm,
  avatarPopupSelector,
  avatarForm,
  deletePopupSelector,
  apiURL,
  apiGroupId,
  apiToken,
} from '../utils/constants.js';
import validationConfig from '../utils/validationConfig';
import { createNewCard } from '../utils/utils.js';

let myId;

/* like card function */
const handleLikeCard = (element) => {
  element.isLiked()
    ? api
        .removeCardLike(element.getCardId())
        .then((res) => {
          console.log(res);
          element.updateLikeCounter(res.likes);
          element.toggleLikeButton();
        })
        .catch((err) => console.error(`Ошибка: ${err}`))
    : api
        .likeCard(element.getCardId())
        .then((res) => {
          console.log(res);
          element.updateLikeCounter(res.likes);
          element.toggleLikeButton();
        })
        .catch((err) => console.error(`Ошибка: ${err}`));
};

/* create api */
const api = new Api(apiURL, apiGroupId, apiToken);

/* set/get user info */
const userInfo = new UserInfo(
  userNameSelector,
  userAboutSelector,
  userAvatarSelector
);

/* image popup */
const imagePopup = new PopupWithImage(imagePopupSelector);
imagePopup.setEventListeners();

/* delete popup */
const deletePopup = new PopupDeleteCard(deletePopupSelector, (element) => {
  api
    .deleteCard(element.getCardId())
    .then(() => {
      element.deleteCard();
      deletePopup.close();
    })
    .catch((err) => console.error(`Ошибка: ${err}`))
    .finally(() => deletePopup.setDefaultSubmitButtonText());
});
deletePopup.setEventListeners();

/* create card's list section */
const cardsList = new Section(
  {
    renderer: (item) => {
      const newCard = createNewCard(
        item,
        cardTemplateSelector,
        imagePopup.open,
        deletePopup.open,
        handleLikeCard,
        myId
      );
      cardsList.addItem(newCard);
    },
  },
  cardsContainerSelector
);

/* profile popup */
const profilePopup = new PopupWithForm(profilePopupSelector, () => {
  api
    .sendUserInfo(profilePopup.getInputValues())
    .then((res) => {
      userInfo.setUserInfo(res);
      profilePopup.close();
    })
    .catch((err) => console.error(`Ошибка: ${err}`))
    .finally(() => profilePopup.setDefaultSubmitButtonText());
});
profilePopup.setEventListeners();

const profileFormValidation = new FormValidator(validationConfig, profileForm);
profileFormValidation.enableValidation();

buttonEditProfile.addEventListener('click', () => {
  profileFormValidation.resetErrorMessage();
  profilePopup.setInputValue(userInfo.getUserInfo());
  profilePopup.open();
});

/* card popup */
const cardPopup = new PopupWithForm(cardPopupSelector, () => {
  api
    .createCard(cardPopup.getInputValues())
    .then((cardData) => {
      cardsList.addItem(
        createNewCard(
          cardData,
          cardTemplateSelector,
          imagePopup.open,
          deletePopup.open,
          handleLikeCard,
          myId
        )
      );
      cardPopup.close();
    })
    .catch((err) => console.error(`Ошибка: ${err}`))
    .finally(() => cardPopup.setDefaultSubmitButtonText());
});
cardPopup.setEventListeners();

const cardFormValidation = new FormValidator(validationConfig, cardForm);
cardFormValidation.enableValidation();

buttonAddCard.addEventListener('click', () => {
  cardFormValidation.resetErrorMessage();
  cardPopup.open();
});

/* avatar popup */
const avatarPopup = new PopupWithForm(avatarPopupSelector, () => {
  api
    .updateUserAvatar(avatarPopup.getInputValues())
    .then((res) => {
      userInfo.setUserInfo(res);
      avatarPopup.close();
    })
    .catch((err) => console.error(`Ошибка: ${err}`))
    .finally(() => avatarPopup.setDefaultSubmitButtonText());
});
avatarPopup.setEventListeners();

const avatarFormValidation = new FormValidator(validationConfig, avatarForm);
avatarFormValidation.enableValidation();

buttonChangeAvatar.addEventListener('click', () => {
  avatarFormValidation.resetErrorMessage();
  avatarPopup.open();
});

/* get initial user info and render initial cards together */
api
  .getAppInfo()
  .then(([cardsData, userData]) => {
    userInfo.setUserInfo(userData);
    myId = userData._id;
    cardsList.renderItems(cardsData.reverse());
  })
  .catch((err) => console.error(`Ошибка: ${err}`));
