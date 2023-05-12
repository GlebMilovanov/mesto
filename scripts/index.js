import initialCards from './initialCards.js';
import validationConfig from './validationConfig.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';

/* page */
const page = document.querySelector('.page');
const userName = page.querySelector('.profile__name');
const userOccupation = page.querySelector('.profile__occupation');
const buttonEditProfile = page.querySelector('.profile__edit-btn');
const buttonAddCard = page.querySelector('.profile__add-btn');
const cardsContainer = page.querySelector('.elements__container');

/* popups */
const popups = page.querySelectorAll('.popup');

/* profile popup */
const profilePopup = page.querySelector('.popup_type_profile');
const profileForm = page.querySelector('.popup__form_type_profile');
const popupName = page.querySelector('.popup__input_type_name');
const popupOccupation = page.querySelector('.popup__input_type_occupation');

/* card popup */
const cardPopup = page.querySelector('.popup_type_card');
const cardForm = page.querySelector('.popup__form_type_card');
const popupCardName = page.querySelector('.popup__input_type_card-name');
const popupCardLink = page.querySelector('.popup__input_type_card-url');

/* image popup */
const imagePopup = page.querySelector('.popup_type_image');
const popupImage = imagePopup.querySelector('.popup__image');
const popupImageName = imagePopup.querySelector('.popup__image-name');

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
  cardsContainer.prepend(createNewCard(newCard, '.element-template', openImagePopup));
  cardForm.reset();

  closePopup(cardPopup);
}

/* add initial cards */
initialCards.forEach((item) => {
  cardsContainer.prepend(createNewCard(item, '.element-template', openImagePopup));
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
