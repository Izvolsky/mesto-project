import './pages/index.css';
import {closePopup, handleProfileFormSubmit, popupEditProfile, profileForm, handleAvatarFormSubmit, popupUpdateAvatar, profileImage, handleNewCardFormSubmit, popupNewCardForm, popupNewCard, openPopup, nameInput, profileName, profileProfession, professionInput} from './components/modal'
import {enableValidation, setting} from './components/validate'

document.querySelector('.profile__button-edit').addEventListener('click', () => { openPopup(popupEditProfile);
  nameInput.value = profileName.textContent;
  professionInput.value = profileProfession.textContent;
});//слушат попап открытия

profileForm.addEventListener('submit', handleProfileFormSubmit);//слушатель отпраки формы профиля

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

