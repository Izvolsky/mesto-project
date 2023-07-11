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
//работает 2. Перед стартом. Как сделать запрос к серверу - проверка запроса
function testResponse(res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}
//универсальная функция запроса с проверкой ответа, чтобы не дублировать эту проверку в каждом запросе
function request(endpoint, options) {
  return fetch(`${urlСonfiguration.url}/${endpoint}`, options).then(
    testResponse
  );
}

//работает 3. Загрузка информации о пользователе с сервера
function getUser() {
  return request(`/users/me`, { headers: urlСonfiguration.headers });
}

//работает 4. Загрузка карточек с сервера
function getCard() {
  return request(`/cards`, { headers: urlСonfiguration.headers });
}

//работает 5. Редактирование профиля
function requestProfilePatch(data) {
  return request(`/users/me`, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: urlСonfiguration.headers,
  });
}

//работает 6. Добавление новой карточки
function addCardPost(data) {
  return request(`/cards`, {
    method: "POST",
    headers: urlСonfiguration.headers,
    body: JSON.stringify(data),
  });
}

//10. Обновление аватара пользователя
function changeAvatar(data) {
  return request(`/users/me/avatar`, {
    method: "PATCH",
    headers: urlСonfiguration.headers,
    body: JSON.stringify(data),
  });
}

//8. Удаление карточки
function deleteCard(cardId) {
  return request(`/cards/${cardId}`, {
    method: "DELETE",
    headers: urlСonfiguration.headers,
  });
}

//9. Постановка лайка
function addLike(cardId) {
  return request(`/cards/likes/${cardId}`, {
    method: "PUT",
    headers: urlСonfiguration.headers,
  });
}

//9. Удаление лайка
function delLike(cardId) {
  return request(`/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: urlСonfiguration.headers,
  });
}
