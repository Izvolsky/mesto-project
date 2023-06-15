export {addCard}
import {openPopup} from './modal'
import {initialCards} from './initialCards'

const popupBigCard = document.querySelector('.popup__big-card');
const popupBigCardImage = popupBigCard.querySelector('.popup__big-card-image');
const popupBigCardText = popupBigCard.querySelector('.popup__big-card-text');
const templateElement = document.querySelector('#template-Element').content; // получить содержимое template
const elementsList = document.querySelector('.elements__list');



const createCard = (cardName, cardLink) => {// функция добавления карточки
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
const addCard = (cardName, cardLink) => {
  const element = createCard(cardName, cardLink);
  elementsList.prepend(element);
}

initialCards.forEach(function (item) {
  const cardName = item.name;
  const cardLink = item.link;
   addCard(cardName, cardLink);
})
