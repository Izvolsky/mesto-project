export {
  closePopup,
  handleProfileFormSubmit,
  popupEditProfile,
  profileForm,
  handleAvatarFormSubmit,
  popupUpdateAvatar,
  profileImage,
  handleNewCardFormSubmit,
  popupNewCardForm,
  popupNewCard,
  openPopup,
  nameInput,
  profileName,
  profileProfession,
  professionInput,
  popupButtonSubmit,
  profileAvatarButton,
};
import { addCard } from "./card.js";
import { handleSubmitСallback } from "./utils.js";
import {
  requestProfilePatch,
  addCardPost,
  changeAvatar,
  deleteCard,
} from "./api.js";
const popupEditProfile = document.querySelector(".popup__edit-profile");
const profileForm = document.forms["form-edit"];
const nameInput = profileForm.querySelector(".popup__input-name");
const profileName = document.querySelector(".profile__name");
const profileProfession = document.querySelector(".profile__profession");
const professionInput = profileForm.querySelector(".popup__input-profession");
const popupUpdateAvatar = document.querySelector(".popup__update-avatar");
const popupUpdateAvatarnameInput =
  popupUpdateAvatar.querySelector(".popup__input-name");
const profileImage = document.querySelector(".profile__image");
const profileAvatarButton = document.querySelector(".profile__avatar-button");
const popupNewCard = document.querySelector(".popup__new-card");
const popupNewCardForm = document.forms["form-new-card"];
const popupNewCardnameInput =
  popupNewCardForm.querySelector(".popup__input-name");
const popupNewCardUrlInput = popupNewCardForm.querySelector(
  ".popup__input-profession"
);
const popupButtonSubmit = popupNewCard.querySelector(".popup__button-submit");

//функция закрытия попапов при клике на ESC
const closePopupClickEsc = (evt) => {
  if (evt.key === "Escape") {
    const popupOpened = document.querySelector(".popup_opened");
    closePopup(popupOpened);
  }
};
//функция открытия попапов
const openPopup = (popup) => {
  document.addEventListener("keydown", closePopupClickEsc); //вешаем слушатель closePopupClickEsc
  popup.classList.add("popup_opened"); // функция открытия попапов всех
};
//функция закрытия попапа
const closePopup = (popup) => {
  document.removeEventListener("keydown", closePopupClickEsc); //снимаем слушатель closePopupClickEsc
  popup.classList.remove("popup_opened"); // функция закрытия попапов всех
};

//ГОТОВО функция отправки формы попапа профиля
const handleProfileFormSubmit = (evt) => {
  handleSubmitСallback(callbackProfileFormSubmit, evt);
};
//ГОТОВО функция отправки формы попапа добавления новой карточки
const handleNewCardFormSubmit = (evt) => {
  handleSubmitСallback(callbackNewCardFormSubmit, evt);
};
//ГОТОВО функция отправки формы попапа аватарки
const handleAvatarFormSubmit = (evt) => {
  handleSubmitСallback(callbackAvatarFormSubmit, evt);
};

//ГОТОВО - колбэк функции отправки формы попапа добавления новой карточки
function callbackNewCardFormSubmit() {
  const cardInfoNameLink = {
    name: popupNewCardnameInput.value,
    link: popupNewCardUrlInput.value,
  };
  return addCardPost(cardInfoNameLink).then((res) => {
    addCard(res);
    closePopup(popupNewCard); // вызов фуенкции закрытия попап добавления новой карточки
    popupButtonSubmit.classList.add("popup__button-submit_disabled");
    popupButtonSubmit.disabled = true;
  });
}
//ГОТОВО - колбэк  функции отправки формы попапа профиля
function callbackProfileFormSubmit() {
  return requestProfilePatch({
    name: nameInput.value,
    about: professionInput.value,
  }).then((data) => {
    profileName.textContent = data.name;
    profileProfession.textContent = data.about;
    closePopup(popupEditProfile); // вызов функции закрытия попап профиля
  });
}
//ГОТОВО - колбэк  функции отправки формы попапа аватарки
function callbackAvatarFormSubmit() {
  return changeAvatar({ avatar: popupUpdateAvatarnameInput.value }).then(
    (data) => {
      profileImage.src = data.avatar;
      closePopup(popupUpdateAvatar); // вызов функции закрытия попапа аватарки
      popupButtonSubmit.classList.add("popup__button-submit_disabled");
      popupButtonSubmit.disabled = true;
    }
  );
}
