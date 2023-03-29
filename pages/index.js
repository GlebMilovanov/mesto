/* page */
const page = document.querySelector(".page");
const userName = page.querySelector(".profile__name");
const userOccupation = page.querySelector(".profile__occupation");
const editButton = page.querySelector(".profile__edit-btn");
const addButton = page.querySelector(".profile__add-btn");
const cardsList = page.querySelector(".elements__container");
console.log(cardsList);

/* popups */
const popups = page.querySelectorAll(".popup");

/* profile popup */
const profilePopup = page.querySelector(".popup_type_profile");
const profileForm = page.querySelector(".popup__form_type_profile");
const popupName = page.querySelector(".popup__input_type_name");
const popupOccupation = page.querySelector(".popup__input_type_occupation");

/* card popup */
const cardPopup = page.querySelector(".popup_type_card");
const cardForm = page.querySelector(".popup__form_type_card");
const popupCardName = page.querySelector(".popup__input_type_card-name");
const popupCardLink = page.querySelector(".popup__input_type_card-url");

/* image popup */
const imagePopup = page.querySelector(".popup_type_image");
const popupImage = imagePopup.querySelector(".popup__image");
const popupImageName = imagePopup.querySelector(".popup__image-name");

/* card template */
const cardTemplate = page.querySelector(".element-template").content;

/* initial cards */
const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Сахалин",
    link: "https://images.unsplash.com/photo-1662953594079-a43b3767aca5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2787&q=80",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

/* functions */
/* open/close popup */
function openPopup(popup) {
  popup.classList.add("popup_opened");
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

function openProfilePopup() {
  openPopup(profilePopup);
  popupName.value = userName.textContent;
  popupOccupation.value = userOccupation.textContent;
}

function openCardPopup() {
  openPopup(cardPopup);
}

/* create card */
function createCard(item) {
  /* clone template */
  const cardElement = cardTemplate.cloneNode(true);
  const deleteCardButton = cardElement.querySelector(".element__delete-btn");
  const likeCardButton = cardElement.querySelector(".element__like-btn");
  const cardImage = cardElement.querySelector(".element__image");
  const cardName = cardElement.querySelector(".element__title");

  /* pass value */
  cardName.textContent = item.name;
  cardImage.src = item.link;
  cardImage.alt = item.name;

  /* open image popup function */
  function openImagePopup() {
    openPopup(imagePopup);
    popupImage.src = item.link;
    popupImage.alt = item.name;
    popupImageName.textContent = item.name;
  }

  /* cards event listeners */
  deleteCardButton.addEventListener("click", function deleteCard(evt) {
    evt.target.parentElement.remove();
  });

  likeCardButton.addEventListener("click", function likeCard(evt) {
    evt.target.classList.toggle("element__like-btn_active");
  });

  cardImage.addEventListener("click", openImagePopup);

  return cardElement;
}

/* add card */
function addCard(item) {
  cardsList.prepend(createCard(item));
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
  popupCardName.value = "";
  popupCardLink.value = "";

  /* close popup*/
  closePopup(cardPopup);
}

/* add initial cards */
initialCards.forEach((item) => addCard(item));

/* close popups */
popups.forEach((popup) => {
  const closeButton = popup.querySelector(".popup__close-btn");
  closeButton.addEventListener("click", () => closePopup(popup));
});

/* event listeners */
editButton.addEventListener("click", openProfilePopup);
addButton.addEventListener("click", openCardPopup);
profileForm.addEventListener("submit", handleProfileFormSubmit);
cardForm.addEventListener("submit", handleCardFormSubmit);
