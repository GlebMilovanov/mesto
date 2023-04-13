import { initialCards } from "./cards.js";

/* page */
const page = document.querySelector(".page");
const userName = page.querySelector(".profile__name");
const userOccupation = page.querySelector(".profile__occupation");
const buttonEditProfile = page.querySelector(".profile__edit-btn");
const buttonAddCard = page.querySelector(".profile__add-btn");
const cardsContainer = page.querySelector(".elements__container");

/* popups */
const popups = page.querySelectorAll(".popup");

/* profile popup */
const profilePopup = page.querySelector(".popup_type_profile");
const profileForm = page.querySelector(".popup__form_type_profile");
const popupName = page.querySelector(".popup__input_type_name");
const popupOccupation = page.querySelector(".popup__input_type_occupation");
const inputsProfileForm = Array.from(
  profileForm.querySelectorAll(".popup__input")
);
const submitButtonProfileForm = profileForm.querySelector(".popup__submit-btn");

/* card popup */
const cardPopup = page.querySelector(".popup_type_card");
const cardForm = page.querySelector(".popup__form_type_card");
const popupCardName = page.querySelector(".popup__input_type_card-name");
const popupCardLink = page.querySelector(".popup__input_type_card-url");
const inputsCardForm = Array.from(cardForm.querySelectorAll(".popup__input"));
const submitButtonCardForm = cardForm.querySelector(".popup__submit-btn");

/* image popup */
const imagePopup = page.querySelector(".popup_type_image");
const popupImage = imagePopup.querySelector(".popup__image");
const popupImageName = imagePopup.querySelector(".popup__image-name");

/* card template */
const cardTemplate = page.querySelector(".element-template").content;

/* functions */
/* open/close popup */
function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupByClickEsc);
}

function closePopup(popup) {
  document.removeEventListener("keydown", closePopupByClickEsc);
  const form = popup.querySelector(".popup__form");
  if (form !== null) resetErrorMessage(form);
  popup.classList.remove("popup_opened");
}

function closePopupByClickEsc(evt) {
  const popup = page.querySelector(".popup_opened");
  if (evt.key === "Escape") closePopup(popup);
}

function openProfilePopup() {
  openPopup(profilePopup);
  popupName.value = userName.textContent;
  popupOccupation.value = userOccupation.textContent;
  toggleButtonState(
    inputsProfileForm,
    submitButtonProfileForm,
    validationConfig
  );
}

function openCardPopup() {
  openPopup(cardPopup);
  cardForm.reset();
  toggleButtonState(inputsCardForm, submitButtonCardForm, validationConfig);
}

/* create card */
function createCard({ name, link }) {
  /* clone template */
  const cardElement = cardTemplate.cloneNode(true).querySelector(".element");
  const deleteCardButton = cardElement.querySelector(".element__delete-btn");
  const likeCardButton = cardElement.querySelector(".element__like-btn");
  const cardImage = cardElement.querySelector(".element__image");
  const cardName = cardElement.querySelector(".element__title");

  /* pass value */
  cardName.textContent = name;
  cardImage.src = link;
  cardImage.alt = name;

  /* card functions */
  /* open image popup */
  function openImagePopup({name, link}) {
    openPopup(imagePopup);
    popupImage.src = link;
    popupImage.alt = name;
    popupImageName.textContent = name;
  }

  /* delete card */
  function deleteCard() {
    cardElement.remove();
  }

  /* like card */
  function likeCard() {
    likeCardButton.classList.toggle("element__like-btn_active");
  }

  /* cards event listeners */
  deleteCardButton.addEventListener("click", deleteCard);

  likeCardButton.addEventListener("click", likeCard);

  cardImage.addEventListener("click", () => openImagePopup({name, link}));

  return cardElement;
}

/* add card */
function addCard(item) {
  cardsContainer.prepend(createCard(item));
}

/* submit forms */
function handleProfileFormSubmit(evt) {
  /* prevent default action */
  evt.preventDefault();

  /* pass value */
  userName.textContent = popupName.value;
  userOccupation.textContent = popupOccupation.value;

  /* close popup */
  closePopup(profilePopup);
}

function handleCardFormSubmit(evt) {
  /* prevent default action */
  evt.preventDefault();

  /* pass value */
  const newCard = {
    name: popupCardName.value,
    link: popupCardLink.value,
  };

  /* add card */
  addCard(newCard);

  /* reset value */
  cardForm.reset();

  /* close popup*/
  closePopup(cardPopup);
}

/* add initial cards */
initialCards.forEach((item) => addCard(item));

/* close popups */
popups.forEach((popup) => {
  const closeButton = popup.querySelector(".popup__close-btn");

  function closePopupByClickOverlay(evt) {
    if (evt.target === evt.currentTarget) closePopup(popup);
  }

  closeButton.addEventListener("click", () => closePopup(popup));
  popup.addEventListener("click", closePopupByClickOverlay);
});

/* event listeners */
buttonEditProfile.addEventListener("click", openProfilePopup);
buttonAddCard.addEventListener("click", openCardPopup);
profileForm.addEventListener("submit", handleProfileFormSubmit);
cardForm.addEventListener("submit", handleCardFormSubmit);
