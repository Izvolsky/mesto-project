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
const popupButtonClose = popupEditProfile.querySelector('.popup__button-close');
const popupButtonSubmit = popupEditProfile.querySelector('.popup__button-submit');
const popupForm = popupEditProfile.querySelector('.popup__form');
const nameInput = popupForm.querySelector('.popup__input-name');
const professionInput = popupForm.querySelector('.popup__input-profession');
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

function popupOpen(popup) {
  popup.classList.add ('popup_opened') // функция открытия попапов всех
}
function popupClose(popup) {
  popup.classList.remove ('popup_opened') // функция закрытия попапов всех
}
function popupEditProfileSubmit(evt) { //функция отправки формы попапа профиля
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileProfession.textContent = professionInput.value;
  popupClose(popupEditProfile); // вызов функции закрытия попап профиля
}
function popupNewCardSubmit(evt) { //функция отправки формы попапа добавления новой карточки
  evt.preventDefault();
  const cardName = popupNewCardnameInput.value;
  const cardLink = popupNewCardUrlInput.value;
  addCard(cardName, cardLink)
  popupClose(popupNewCard); // вызов фуенкции закрытия попап добавления новой карточки
  popupNewCardnameInput.value = '';
  popupNewCardUrlInput.value = '';
}
// функция добавления карточки
function addCard(cardName, cardLink) {
  const templateElement = document.querySelector('#template-Element').content; // получить содержимое template
  const elementsList = document.querySelector('.elements__list');
  // клонируем содержимое тега template
  const element = templateElement.querySelector('.element').cloneNode(true);
  // поставили сердечку обработчик клика и прописали колбэк
  element.querySelector('.element__button').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__button_active');
  })
  // поставили урне обработчик клика и прописали колбэк удаления карточки
  element.querySelector('.element__button-trash').addEventListener('click', function (evt) {
    evt.target.parentElement.remove();
  })
  // наполняем содержимым
  element.querySelector('.element__image').src = cardLink;
  element.querySelector('.element__place').textContent = cardName;
  element.querySelector('.element__image').alt = cardName;
  // отображаем на странице
  elementsList.prepend(element);
  // открытие попапа большого изображения
  element.querySelector('.element__image').addEventListener('click', function (evt) {
    const popupBigCard = document.querySelector('.popup__big-card');
    popupOpen(popupBigCard);
    popupBigCardImage.src = evt.target.src;
    popupBigCardText.textContent = evt.target.alt;
  })
}
profileButtonEdit.addEventListener('click', () => {
  popupOpen(popupEditProfile);
});//слушат попап открытия
popupButtonClose.addEventListener('click', () => {
  popupClose(popupEditProfile);
});//слушат попап закрытия*/
popupNewCardButtonAdd.addEventListener('click', () => {
  popupOpen(popupNewCard);
});//слушат попап добавления новой карточки открытия
popupNewCardButtonClose.addEventListener('click', () => {
  popupClose(popupNewCard);
});//слушат попапа закрытия добавления новой карточки
popupBigCardButtonClose.addEventListener('click', () => {
  popupClose(popupBigCard);
});//слушат закрытия попапа большой фото
popupForm.addEventListener('submit', popupEditProfileSubmit);//слушатель отпраки формы профиля
popupNewCardForm.addEventListener('submit', popupNewCardSubmit);//слушатель отпраки формы попапа добавления новой карточки
initialCards.forEach(function (item) {
  const cardName = item.name;
  const cardLink = item.link;
   addCard(cardName, cardLink);
})
























