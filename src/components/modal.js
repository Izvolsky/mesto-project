export {closePopup, handleProfileFormSubmit, popupEditProfile, profileForm, handleAvatarFormSubmit, popupUpdateAvatar, profileImage, handleNewCardFormSubmit, popupNewCardForm, popupNewCard, openPopup, nameInput, profileName, profileProfession, professionInput}
import {addCard} from './card.js'

const popupEditProfile = document.querySelector('.popup__edit-profile');
const profileForm = popupEditProfile.querySelector('.popup__form');
const nameInput = profileForm.querySelector('.popup__input-name');
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');
const professionInput = profileForm.querySelector('.popup__input-profession');
const popupUpdateAvatar = document.querySelector('.popup__update-avatar');
const popupUpdateAvatarnameInput = popupUpdateAvatar.querySelector('.popup__input-name');
const profileImage = document.querySelector('.profile__image');
const popupNewCard = document.querySelector('.popup__new-card');
const popupNewCardForm = popupNewCard.querySelector('.popup__form');
const popupNewCardnameInput = popupNewCardForm.querySelector('.popup__input-name');
const popupNewCardUrlInput = popupNewCardForm.querySelector('.popup__input-profession');

//функция закрытия попапов при клике на ESC
const closePopupClickEsc = (evt) => {
  const popupOpened = document.querySelector('.popup_opened');
  if (evt.key === 'Escape') {
    closePopup(popupOpened);
  }}

const openPopup = (popup) => {
  document.addEventListener('keydown', closePopupClickEsc) //вешаем слушатель closePopupClickEsc
  popup.classList.add ('popup_opened') // функция открытия попапов всех
}

const closePopup = (popup) => {
  document.removeEventListener('keydown', closePopupClickEsc)//снимаем слушатель closePopupClickEsc
  popup.classList.remove ('popup_opened') // функция закрытия попапов всех
}

const handleProfileFormSubmit = (evt) => { //функция отправки формы попапа профиля
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileProfession.textContent = professionInput.value;
  closePopup(popupEditProfile); // вызов функции закрытия попап профиля
}
const handleAvatarFormSubmit = (evt) => { //функция отправки формы попапа аватарки
  evt.preventDefault();
  profileImage.src = popupUpdateAvatarnameInput.value;
  closePopup(popupUpdateAvatar); // вызов функции закрытия попапа аватарки
}
const handleNewCardFormSubmit = (evt) => { //функция отправки формы попапа добавления новой карточки
  evt.preventDefault();
  const cardName = popupNewCardnameInput.value;
  const cardLink = popupNewCardUrlInput.value;
  addCard(cardName, cardLink)
  closePopup(popupNewCard); // вызов фуенкции закрытия попап добавления новой карточки
  popupNewCardForm.reset(); // восстанавливаем стандартные значения всем элементам формы вместо value
  const popupButtonSubmit = popupNewCard.querySelector('.popup__button-submit');
  popupButtonSubmit.classList.add('popup__button-submit_disabled')
  popupButtonSubmit.disabled = true;
}


