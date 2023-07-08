export {
  getUser,
  getCard,
  requestProfilePatch,
  addCardPost,
  addLike,
  delLike,
  changeAvatar,
  deleteCard,
};

//работает 1. Перед стартом. Необходимая информация
const urlСonfiguration = {
  url: "https://nomoreparties.co/v1/plus-cohort-25",
  headers: {
    authorization: "a78a044e-4709-4a41-872a-17cb16b4ed50",
    "Content-Type": "application/json",
  },
};
//работает 2. Перед стартом. Как сделать запрос к серверу
function testResponse(res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}

//работает 3. Загрузка информации о пользователе с сервера
function getUser() {
  return fetch(`${urlСonfiguration.url}/users/me`, {
    headers: urlСonfiguration.headers,
  }).then(testResponse);
}

//работает 4. Загрузка карточек с сервера
function getCard() {
  return fetch(`${urlСonfiguration.url}/cards`, {
    headers: urlСonfiguration.headers,
  }).then(testResponse);
}

//работает 5. Редактирование профиля
function requestProfilePatch(data) {
  return fetch(`${urlСonfiguration.url}/users/me`, {
    method: "PATCH",
    headers: urlСonfiguration.headers,
    body: JSON.stringify(data),
  }).then(testResponse);
}

//работает 6. Добавление новой карточки
function addCardPost(data) {
  return fetch(`${urlСonfiguration.url}/cards`, {
    method: "POST",
    headers: urlСonfiguration.headers,
    body: JSON.stringify(data),
  }).then(testResponse);
}

//!!! осталось доделать гаведение карандашика 10. Обновление аватара пользователя
function changeAvatar(data) {
  return fetch(`${urlСonfiguration.url}/users/me/avatar`, {
    method: "PATCH",
    headers: urlСonfiguration.headers,
    body: JSON.stringify(data),
  }).then(testResponse);
}

//8. Удаление карточки
function deleteCard(cardId) {
  return fetch(`${urlСonfiguration.url}/cards/${cardId}`, {
    method: "DELETE",
    headers: urlСonfiguration.headers,
  }).then(testResponse);
}

//9. Постановка лайка
function addLike(cardId) {
  return fetch(`${urlСonfiguration.url}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: urlСonfiguration.headers,
  }).then(testResponse);
}

//9. Удаление лайка
function delLike(cardId) {
  return fetch(`${urlСonfiguration.url}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: urlСonfiguration.headers,
  }).then(testResponse);
}
