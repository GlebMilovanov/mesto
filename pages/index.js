const page = document.querySelector(".page");

const userName = page.querySelector(".profile__name");
const userOccupation = page.querySelector(".profile__occupation");
const editButton = page.querySelector(".profile__edit-btn");
const addButton = page.querySelector(".profile__add-btn");

const popups = page.querySelectorAll(".popup")
const profilePopup = page.querySelector(".popup_type_profile");
const cardPopup = page.querySelector(".popup_type_card");
const profileForm = page.querySelector(".popup__form_type_profile");
const cardForm = page.querySelector(".popup__form_type_card")
const popupName = page.querySelector(".popup__input_type_name");
const popupOccupation = page.querySelector(".popup__input_type_occupation");
const popupCardName = page.querySelector(".popup__input_type_card-name");
const popupCardLink = page.querySelector(".popup__input_type_card-url");
const cardsList = page.querySelector(".elements__container");
const cardTemplate = page.querySelector(".element-template").content;

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
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

function addCard(item) {
  cardsList.prepend(createCard(item));
}

function createCard(item) {
  const cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector(".element__title").textContent = item.name;
  cardElement.querySelector(".element__image").src = item.link;
  cardElement.querySelector(".element__image").alt = item.name;

  const deleteCardButton = cardElement.querySelector(".element__delete-btn");
  const likeCardButton = cardElement.querySelector(".element__like-btn");
  const card = cardElement.querySelector(".element")

  deleteCardButton.addEventListener("click", function deleteCard(evt) {
    card.remove();
  });
  likeCardButton.addEventListener("click", function likeCard(evt) {
    evt.target.classList.toggle("element__like-btn_active");
  });

  return cardElement;
}

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
  }

  addCard(newCard);
  popupCardName.value = '';
  popupCardLink.value = '';

  closePopup(cardPopup)
}

initialCards.forEach((item) => addCard(item));

popups.forEach(popup => {
  const closeButton = popup.querySelector(".popup__close-btn");
  closeButton.addEventListener("click", () => closePopup(popup))
});

editButton.addEventListener("click", openProfilePopup);
addButton.addEventListener("click", openCardPopup);
profileForm.addEventListener("submit", handleProfileFormSubmit);
cardForm.addEventListener("submit", handleCardFormSubmit);
