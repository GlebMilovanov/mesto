const page = document.querySelector('.page');
const userName = page.querySelector('.profile__name');
const userOccupation = page.querySelector('.profile__occupation');
const popup = page.querySelector('.popup');
const form = popup.querySelector('.popup__form')
const editButton = page.querySelector('.profile__edit-btn');
const closeButton = popup.querySelector('.popup__close-btn');
const submitButton = form.querySelector('.popup__submit-btn');
const popupName = form.querySelector('.popup__input_type_name');
const popupOccupation = form.querySelector('.popup__input_type_occupation');

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
form.addEventListener('submit', handleFormSubmit);
