






import initialCards from '../scripts/initialCards.js';
import validationConfig from './validationConfig.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import {
  page,
  userName,
  userOccupation,
  buttonEditProfile,
  buttonAddCard,
  cardsContainer,
  popups,
  profilePopup,
  profileForm,
  popupName,
  popupOccupation,
  cardPopup,
  cardForm,
  popupCardName,
  popupCardLink,
  imagePopup,
  popupImage,
  popupImageName,
} from '../utils/constants.js';

/* functions */
/* open/close popup */
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByClickEsc);
}

function closePopup(popup) {
  document.removeEventListener('keydown', closePopupByClickEsc);
  popup.classList.remove('popup_opened');
}

function closePopupByClickEsc(evt) {
  if (evt.key === 'Escape') closePopup(page.querySelector('.popup_opened'));
}

function openProfilePopup() {
  openPopup(profilePopup);
  profileFormValidation.resetErrorMessage();
  popupName.value = userName.textContent;
  popupOccupation.value = userOccupation.textContent;
}

function openCardPopup() {
  cardFormValidation.resetErrorMessage();
  openPopup(cardPopup);
  cardForm.reset();
}

function openImagePopup(name, link) {
  openPopup(imagePopup);
  popupImage.src = link;
  popupImage.alt = name;
  popupImageName.textContent = name;
}

/* create new card */
function createNewCard(item, selector, openImagePopup) {
  const card = new Card(item, selector, openImagePopup);
  return card.generate();
}

/* submit forms */
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  userName.textContent = popupName.value;
  userOccupation.textContent = popupOccupation.value;

  closePopup(profilePopup);
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();

  const newCard = {
    name: popupCardName.value,
    link: popupCardLink.value,
  };

  /* add card */
  cardsContainer.prepend(
    createNewCard(newCard, '.element-template', openImagePopup)
  );
  cardForm.reset();

  closePopup(cardPopup);
}

/* add initial cards */
initialCards.forEach((item) => {
  cardsContainer.prepend(
    createNewCard(item, '.element-template', openImagePopup)
  );
});

/* close popups */
popups.forEach((popup) => {
  const closeButton = popup.querySelector('.popup__close-btn');

  function closePopupByClickOverlay(evt) {
    if (evt.target === evt.currentTarget) closePopup(popup);
  }

  closeButton.addEventListener('click', () => closePopup(popup));
  popup.addEventListener('click', closePopupByClickOverlay);
});

/* add form validation */
const profileFormValidation = new FormValidator(validationConfig, profileForm);
profileFormValidation.enableValidation();

const cardFormValidation = new FormValidator(validationConfig, cardForm);
cardFormValidation.enableValidation();

/* event listeners */
buttonEditProfile.addEventListener('click', openProfilePopup);
buttonAddCard.addEventListener('click', openCardPopup);
profileForm.addEventListener('submit', handleProfileFormSubmit);
cardForm.addEventListener('submit', handleCardFormSubmit);
