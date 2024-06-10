/* Урок 1. Dom-дерево
Вы разрабатываете веб-страницу для отображения расписания занятий в спортивном клубе. Каждое занятие имеет
- название,
- время проведения, 
- максимальное количество участников и 
- текущее количество записанных участников.
1. Создайте веб-страницу с заголовком "Расписание занятий" и областью для отображения занятий.
2. Загрузите информацию о занятиях из предоставленных JSON-данных. Каждое занятие должно отображаться на странице с указанием его названия, времени проведения, максимального количества участников и текущего количества записанных участников.
3. Пользователь может нажать на кнопку "Записаться" для записи на занятие. Если максимальное количество участников уже достигнуто, кнопка "Записаться" становится неактивной.
4. После успешной записи пользователя на занятие, обновите количество записанных участников и состояние кнопки "Записаться".
5. Запись пользователя на занятие можно отменить путем нажатия на кнопку "Отменить запись". После отмены записи, обновите количество записанных участников и состояние кнопки.
6. Все изменения (запись, отмена записи) должны сохраняться и отображаться в реальном времени на странице.
7. При разработке используйте Bootstrap для стилизации элементов.*/

const activitiesJSON = `[{"id":1,"title":"Пилатес","time":"10.00 - 11.00","numberSits":15,"numberPeople":5},{"id":2,"title":"Йога","time":"12.00 - 13.00","numberSits":12,"numberPeople":3},{"id":3,"title":"Карате-до","time":"15.00 - 16.00","numberSits":20,"numberPeople":10}]`;

const localStorageKey = "activities";
const data = localStorage.getItem(localStorageKey);

if (!data) {
  localStorage.setItem(localStorageKey, activitiesJSON);
}

const activities = JSON.parse(localStorage.getItem(localStorageKey));

const activitiesHtml = activities
  .map((activity) => getActivityHtml(activity))
  .join("");

const listEl = document.querySelector(".list"); // находим div в html

listEl.innerHTML = activitiesHtml; // заполняем div из html данными

const signBtnElems = document.querySelectorAll(".sign"); // кнопка "записаться" из функции
//изначально все кнопки отмены неактивны
const cancelBtnElems = document.querySelectorAll(".cancel"); // кнопка "отменить" из функции
cancelBtnElems.forEach((element) => (element.disabled = true)); // перебираем все кнопки "отменить", и true - блокирует кнопки

listEl.addEventListener("click", function (e) {
  // при клике на div
  const parentEl = e.target.closest(".activity"); // ищем ближ.род.элемент
  const id = +parentEl.dataset.id; // род.элемент - для хранения значений на элементах в html - цифрой
  const indexActivity = activities.findIndex((activity) => activity.id === id); // находим в данных id

  const currentMembersEl = parentEl.querySelector(".current-number"); // находим количество записавшихся
  const currentMembers = activities[indexActivity].numberPeople; // находим индекс в массиве данных - количество записавшихся

  //если достигнуто максимально кол-во участников, кнопка записи неактивна
  const maxMembers = activities[indexActivity].numberSits; // в объекте находим макс.число участников
  if (currentMembers === maxMembers) {
    // если кол-во записавш-ся = макс.числу участников, то
    signBtnElems[indexActivity].disabled = true; // кнопка записаться из функции, неактивна
  }

  if (e.target.classList.contains("sign")) {
    // проверяем наличие класса у эл-та sign
    //изменяем кол-во записанных участников в html
    currentMembersEl.textContent = currentMembers + 1; // Увеличиваем кол-во записавшихся при нажатии на кнопку "Записаться"

    //изменяем кол-во участников в массиве и записываем в localStorage
    activities[indexActivity].numberPeople += 1;
    localStorage.setItem(localStorageKey, JSON.stringify(activities));

    //делаем кнопку записи неактивной, если пользователь уже записался, а кнопку отмены - активной
    signBtnElems[indexActivity].disabled = true;
    cancelBtnElems[indexActivity].disabled = false;
  }
  if (e.target.classList.contains("cancel")) {
    // проверяем наличие класса
    //уменьшаем кол-во записанных участников в html
    currentMembersEl.textContent = currentMembers - 1;

    //изменяем кол-во участников в массиве и записываем в localStorage
    activities[indexActivity].numberPeople -= 1;
    localStorage.setItem(localStorageKey, JSON.stringify(activities));

    //делаем кнопку записи неактивной, если пользователь уже записался, а кнопку отмены - активной
    signBtnElems[indexActivity].disabled = false;
    cancelBtnElems[indexActivity].disabled = true;
  }
});

function getActivityHtml(activity) {
  return `<div class="activity" data-id="${activity.id}">
    <div class="title">${activity.title}</div>
    <div class="time"><strong>Время проведения:</strong> ${activity.time}</div>
    <div class="max-members"><strong>Максимальное количество участников:</strong> <span class="max-number">${activity.numberSits}</span></div>
    <div class="current-members"><strong>Текущее количество участников:</strong> <span class="current-number"> ${activity.numberPeople}</span></div>
    <button class="sign">Записаться</button>
    <button class="cancel">Отменить запись</button>
    
</div>`;
}
