const page = document.querySelector(".page");
const userName = page.querySelector(".profile__name");
const userOccupation = page.querySelector(".profile__occupation");
const editButton = page.querySelector(".profile__edit-btn");
const popup = page.querySelector(".popup");
const form = popup.querySelector(".popup__form");
const closeButton = popup.querySelector(".popup__close-btn");
const popupName = form.querySelector(".popup__input_type_name");
const popupOccupation = form.querySelector(".popup__input_type_occupation");
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

initialCards.forEach(function (card) {
  const cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector(".element__title").textContent = card.name;
  cardElement.querySelector(".element__image").setAttribute("src", card.link);

  cardsList.prepend(cardElement);
});

function openPopup() {
  popup.classList.add("popup_opened");
  popupName.value = userName.textContent;
  popupOccupation.value = userOccupation.textContent;
}

function closePopup() {
  popup.classList.remove("popup_opened");
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  userName.textContent = popupName.value;
  userOccupation.textContent = popupOccupation.value;
  closePopup();
}

editButton.addEventListener("click", openPopup);
closeButton.addEventListener("click", closePopup);
form.addEventListener("submit", handleFormSubmit);
