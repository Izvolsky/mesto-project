const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
const profileButtonEdit = document.querySelector('.profile__button-edit');
const popupEditProfile = document.querySelector('.popup__edit-profile');
const profileCloseButton = popupEditProfile.querySelector('.popup__button-close');
const popupButtonSubmit = popupEditProfile.querySelector('.popup__button-submit');
const profileForm = popupEditProfile.querySelector('.popup__form');
const nameInput = profileForm.querySelector('.popup__input-name');
const professionInput = profileForm.querySelector('.popup__input-profession');
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');
const popupNewCard = document.querySelector('.popup__new-card');
const popupNewCardButtonAdd = document.querySelector('.profile__button-add');
const popupNewCardButtonClose = popupNewCard.querySelector('.popup__button-close');
const popupNewCardButtonSubmit = popupNewCard.querySelector('.popup__button-submit');
const popupNewCardForm = popupNewCard.querySelector('.popup__form');
const popupNewCardnameInput = popupNewCardForm.querySelector('.popup__input-name');
const popupNewCardUrlInput = popupNewCardForm.querySelector('.popup__input-profession');
const popupBigCard = document.querySelector('.popup__big-card');
const popupBigCardButtonClose = popupBigCard.querySelector('.popup__button-close');
const popupBigCardImage = popupBigCard.querySelector('.popup__big-card-image');
const popupBigCardText = popupBigCard.querySelector('.popup__big-card-text');
const templateElement = document.querySelector('#template-Element').content; // получить содержимое template
const elementsList = document.querySelector('.elements__list');
const closeButtons = document.querySelectorAll('.popup__button-close');
function openPopup(popup) {
  popup.classList.add ('popup_opened') // функция открытия попапов всех
}
function closePopup(popup) {
  popup.classList.remove ('popup_opened') // функция закрытия попапов всех
}
function handleProfileFormSubmit(evt) { //функция отправки формы попапа профиля
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileProfession.textContent = professionInput.value;
  closePopup(popupEditProfile); // вызов функции закрытия попап профиля
}
function handleNewCardFormSubmit(evt) { //функция отправки формы попапа добавления новой карточки
  evt.preventDefault();
  const cardName = popupNewCardnameInput.value;
  const cardLink = popupNewCardUrlInput.value;
  addCard(cardName, cardLink)
  closePopup(popupNewCard); // вызов фуенкции закрытия попап добавления новой карточки
  popupNewCardForm.reset(); // восстанавливаем стандартные значения всем элементам формы вместо value
}
// функция добавления карточки
function createCard(cardName, cardLink) {
  // клонируем содержимое тега template
  const element = templateElement.querySelector('.element').cloneNode(true);
  const elementImage = element.querySelector('.element__image');
  // поставили сердечку обработчик клика и прописали колбэк
  element.querySelector('.element__button').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__button_active');
  })
  // поставили урне обработчик клика и прописали колбэк удаления карточки
  element.querySelector('.element__button-trash').addEventListener('click', function (evt) {
    evt.target.closest('.element').remove();
  })
  // наполняем содержимым
  elementImage.src = cardLink;
  element.querySelector('.element__place').textContent = cardName;
  elementImage.alt = cardName;
  // открытие попапа большого изображения
  elementImage.addEventListener('click', function (evt) {
    openPopup(popupBigCard);
    popupBigCardImage.src = evt.target.src;
    popupBigCardText.textContent = evt.target.alt;
    popupBigCardImage.alt = evt.target.alt;
  })
  return element;
}
function addCard(cardName, cardLink) {
  const element = createCard(cardName, cardLink);
  elementsList.prepend(element);
}
profileButtonEdit.addEventListener('click', () => {
  openPopup(popupEditProfile);
});//слушат попап открытия
popupNewCardButtonAdd.addEventListener('click', () => {
  openPopup(popupNewCard);
});//слушат попап добавления новой карточки открытия
profileForm.addEventListener('submit', handleProfileFormSubmit);//слушатель отпраки формы профиля
popupNewCardForm.addEventListener('submit', handleNewCardFormSubmit);//слушатель отпраки формы попапа добавления новой карточки
initialCards.forEach(function (item) {
  const cardName = item.name;
  const cardLink = item.link;
   addCard(cardName, cardLink);
})
closeButtons.forEach((button) => {
  // находим 1 раз ближайший к крестику попап
  const popup = button.closest('.popup');
  // устанавливаем обработчик закрытия на крестик
  button.addEventListener('click', () => closePopup(popup));
});























