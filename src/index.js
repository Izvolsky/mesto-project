import './pages/index.css';
import {openPopup} from './components/utils'
import {closePopup, handleProfileFormSubmit, popupEditProfile, profileForm, handleAvatarFormSubmit, popupUpdateAvatar, profileImage, handleNewCardFormSubmit, popupNewCardForm, popupNewCard} from './components/modal'
import {enableValidation, setting} from './components/validate'

document.querySelector('.profile__button-edit').addEventListener('click', () => { openPopup(popupEditProfile);
});//слушат попап открытия

profileForm.addEventListener('submit', handleProfileFormSubmit);//слушатель отпраки формы профиля

popupEditProfile.addEventListener('click', function(evt) {
  if (evt.target.classList.contains('popup')) {
    closePopup(popupEditProfile);
  }
})
profileImage.addEventListener('click', () => {
  openPopup(popupUpdateAvatar);
});//слушат попап редактирования аватарки

document.querySelector('.profile__button-add').addEventListener('click', () => {
  openPopup(popupNewCard);
});//слушат попап добавления новой карточки открытия

popupNewCardForm.addEventListener('submit', handleNewCardFormSubmit);//слушатель отпраки формы попапа добавления новой карточки

popupUpdateAvatar.addEventListener('submit', handleAvatarFormSubmit);
//сверху слушатель отправки формы попапа изменения аватарки

//слуш закрытие любого попапа при нажатии ESC
document.addEventListener('keydown', function(evt) {
  const popupOpened = document.querySelector('.popup_opened');
  if (evt.key === 'Escape') {
    closePopup(popupOpened);
  }}
)

//слуш закрытия попапов при клике на оверлей перебором forEach
document.querySelectorAll('.popup').forEach(function (popup) {
  popup.addEventListener('click', function(evt) {
    if (evt.target.classList.contains('popup')) {
      closePopup(popup);;
    }
  })
})

document.querySelectorAll('.popup__button-close').forEach((button) => {
  // находим 1 раз ближайший к крестику попап
  const popup = button.closest('.popup');
  // устанавливаем обработчик закрытия на крестик
  button.addEventListener('click', () => closePopup(popup));
});

//удаление автозаполнения в инпутах - достало уже!!!
document.querySelectorAll('.popup__input').forEach((input) => {
  input.setAttribute('autocomplete','off');
})

enableValidation(setting);

