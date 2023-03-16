let page = document.querySelector('.page');
let userName = page.querySelector('.profile__name');
let userOccupation = page.querySelector('.profile__occupation');
let popup = page.querySelector('.popup');
let form = popup.querySelector('.popup__form')
let editButton = page.querySelector('.profile__edit-btn');
let closeButton = popup.querySelector('.popup__close-btn');
let submitButton = form.querySelector('.popup__submit-btn');
let popupName = form.querySelector('.popup__name');
let popupOccupation = form.querySelector('.popup__occupation');

const openPopup = function () {
  popup.classList.add('popup_opened')
  popupName.value = userName.textContent;
  popupOccupation.value = userOccupation.textContent;
}

const closePopup = function () {
  popup.classList.remove('popup_opened')
}

function handleFormSubmit (evt) {
  evt.preventDefault();
  userName.textContent = popupName.value;
  userOccupation.textContent = popupOccupation.value;
  closePopup();
};

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
submitButton.addEventListener('click', handleFormSubmit);
