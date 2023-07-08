export { handleSubmitСallback };

//функция замены кнопки СОХРАНИТЬ во время загрузки
function renderLoading(isLoading, button) {
  if (isLoading) {
    button.textContent = "Сохранение...";
  } else {
    button.textContent = "Сохранить";
  }
}

//функция -коллбэк обработчик отправки формы
function handleSubmitСallback(callbackFunction, evt) {
  evt.preventDefault();
  const button = evt.submitter; //кнопка, вызвавшая событие
  renderLoading(true, button); //меняем состояние кнопки на 'Сохранение...'
  callbackFunction() //вызываеи
    .then(() => {
      evt.target.reset(); //очищаем поля формы
    })
    .catch((err) => {
      console.error(`Ошибка: ${err}`);
    })
    .finally(() => {
      renderLoading(false, button); //меняем состояние кнопки на стандарт в любом случае
    });
}
