export { addCard, elementsList, createCard };
import {
  openPopup,
  popupDeleteCard,
  closePopup,
  popupButtonSubmit,
} from "./modal";
import { deleteCard, addLike, delLike, getUser } from "./api";
import { handleSubmitСallback } from "./utils";
const popupBigCard = document.querySelector(".popup__big-card");
const popupBigCardImage = popupBigCard.querySelector(".popup__big-card-image");
const popupBigCardText = popupBigCard.querySelector(".popup__big-card-text");
const templateElement = document.querySelector("#template-Element").content; // получить содержимое template
const elementsList = document.querySelector(".elements__list");

// функция создание карточки
const createCard = (card, userId) => {
  const cardName = card.name;
  const cardLink = card.link;
  const ownerId = card.owner._id;
  const cardId = card._id;
  const cardLikesNumber = card.likes.length;
  // клонируем содержимое тега template
  const element = templateElement.querySelector(".element").cloneNode(true);
  const elementLikeCounter = element.querySelector(".element__like-counter");
  const elementImage = element.querySelector(".element__image");
  const elementPlace = element.querySelector(".element__place");
  const elementButtonTrash = element.querySelector(".element__button-trash");
  const elementButton = element.querySelector(".element__button"); //элемент лайк
  elementImage.src = cardLink;
  elementPlace.textContent = cardName;
  elementImage.alt = cardName;

  //колбэк функция удаления карточки
  function callbackDeleteCardFormSubmit() {
    return deleteCard(cardId)
      .then((res) => {
        closePopup(popupDeleteCard);
        popupButtonSubmit.classList.add("popup__button-submit_disabled");
        popupButtonSubmit.disabled = true;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  //слушатель корзины для удаления карточки
  elementButtonTrash.addEventListener("click", (evt) => {
    openPopup(popupDeleteCard);
    const closestElement = evt.target.closest(".element");
    const handleDeleteCardFormSubmit = (evt) => {
      evt.preventDefault();
      handleSubmitСallback(callbackDeleteCardFormSubmit, evt);
      closestElement.remove();
    };
    popupDeleteCard.addEventListener("submit", handleDeleteCardFormSubmit);
  });

  //проверяем есть ли лайки у карточки
  if (cardLikesNumber > 0) {
    elementLikeCounter.textContent = cardLikesNumber;
  } else {
    elementLikeCounter.textContent = "";
  }
  // проверка моя карточка или нет, отображение урны
  if (userId !== ownerId) {
    elementButtonTrash.remove();
  }
  //провяем в массиве лайков у карточки с сервера, есть ли лайк поставленный мной, если да, то лайк активный
  if (
    card.likes.find((like) => {
      return like._id === userId;
    })
  ) {
    elementButton.classList.add("element__button_active");
  }
  //слушатель лайка
  elementButton.addEventListener("click", function (evt) {
    // если лайк активный, то при нажатии делаем запрос на удаление лайка, если все ок, то изменяется счетчик лайков и удаляется класс активности
    if (elementButton.classList.contains("element__button_active")) {
      delLike(card._id).then((res) => {
        elementLikeCounter.textContent = res.likes.length;
        elementButton.classList.remove("element__button_active");
      });
    } else {
      addLike(card._id).then((res) => {
        elementLikeCounter.textContent = res.likes.length;
        elementButton.classList.add("element__button_active");
      });
    }
  });

  // открытие попапа большого изображения
  elementImage.addEventListener("click", function (evt) {
    openPopup(popupBigCard);
    popupBigCardImage.src = evt.target.src;
    popupBigCardText.textContent = evt.target.alt;
    popupBigCardImage.alt = evt.target.alt;
  });
  return element;
};

//функция добавление карточки в DOM
const addCard = (card) => {
  getUser().then((res) => {
    const user = res;
    const element = createCard(card, user._id);
    elementsList.prepend(element);
  });
};
