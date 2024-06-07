// Задание 1 (тайминг 30 минут)
// Работа с BOM
// 1. Определение текущего размера окна браузера:
// Напишите функцию, которая будет выводить текущую ширину и высоту окна браузера при его изменении.

const heightWindow = document.querySelector(".height>span");
const widthWindow = document.querySelector(".width>span");

heightWindow.textContent = window.innerHeight; // просто вывод
widthWindow.textContent = window.innerWidth;

window.addEventListener("resize", () => {
  // когда изменится размер окна, вывести значения
  heightWindow.textContent = window.innerHeight;
  widthWindow.textContent = window.innerWidth;
});

// 2. Подтверждение закрытия страницы:
// Создайте всплывающее окно или диалоговое окно, которое появляется при попытке закрыть вкладку браузера и спрашивает пользователя, уверен ли он в своем решении закрыть страницу.

window.addEventListener("beforeunload", (event) => {
  event.preventDefault(); // прервать
  alert("Хотите покинуть страницу?"); // скорее не сработает, т.к. ранее злоупотребляли этим вопросом
});

// 3. Управление историей переходов:
// Используйте объект history для управления историей переходов на веб-странице. Создайте кнопки "Назад" и "Вперед" для перемещения по истории.
const backButton = document.querySelector(".backButton");
const forwardButton = document.querySelector(".forwardButton");

backButton.addEventListener("click", () => {
  window.history.back();
});

forwardButton.addEventListener("click", () => {
  window.history.forward();
});
