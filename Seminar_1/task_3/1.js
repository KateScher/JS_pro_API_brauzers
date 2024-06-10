/* Задание 3 (тайминг 50 минут)
1. Вы создаете веб-страницу для отображения списка статей. Каждая статья состоит из id, заголовка и текста. id будем брать из unix timestamp.
2. Необходимо подготовить список статей в JSON-формате, которые будут выводиться на странице при первом ее открытии.
4. Позвольте пользователю добавлять новые статьи. При нажатии на кнопку "Добавить статью" должна появиться новая статья с заголовком "Новая статья" и текстом "Введите содержание статьи...".
5. Реализуйте функциональность удаления статей. При нажатии на кнопку "Удалить" соответствующая статья должна быть удалена из списка.
6. Реализуйте функциональность редактирования статей. При нажатии на кнопку "Редактировать" пользователь должен иметь возможность изменить заголовок и текст статьи. Используйте всплывающее окно или prompt для ввода новых данных.
7. Все изменения (добавление, удаление, редактирование) должны быть сохранены в локальное хранилище браузера, чтобы они сохранялись после перезагрузки страницы.*/

// отправим в консоль эти данные
// const initialJson = JSON.stringify([
//   {
//     id: Date.now(),
//     title: "Заголовок статьи 1",
//     text: "Содержание статьи 1",
//   },
//   {
//     id: Date.now(),
//     title: "Заголовок статьи 2",
//     text: "Содержание статьи 2",
//   },
//   {
//     id: Date.now(),
//     title: "Заголовок статьи 3",
//     text: "Содержание статьи 3",
//   },
// ]);

// из консоли копируем уже эту строку из массива с объектами
const initialJson =
  '[{"id": 1717779293221, "title": "Заголовок статьи 1", "text": "Содержание статьи 1"}, {"id": 1717779293222, "title": "Заголовок статьи 2", "text": "Содержание статьи 2"}, {"id": 1717779293223,"title": "Заголовок статьи 3", "text": "Содержание статьи 3"}]';

// Проверим есть ли в localStorage сохраненные данные, если их нет, то сохраним
// эти данные в LocalStorage
const lsKey = "articles";
if (!localStorage.getItem(lsKey)) {
  // если данных не будет в localStorage, то зайдем туда и сохраним initialJson
  localStorage.setItem(lsKey, initialJson);
}

const articles = JSON.parse(localStorage.getItem(lsKey));
const ulList = document.querySelector(".news");

ulList.innerHTML = articles.map(createArticleHTML).join(""); // вставка в HTML

function createArticleHTML(article) {
  return `<li id='${article.id}'> 
        <h2 class='title'>${article.title}</h2>
        <p class='text'>${article.text}</p>
        <button class='delete-btn'>Удалить</button>
        <button class='edit-btn'>Редактировать</button>
      </li>`;
}

const deleteBtn = document.querySelector(".delete-btn");

ulList.addEventListener("click", ({ target }) => {
  const liItem = target.closest("li");
  if (target.closest(".delete-btn")) {
    liItem.remove(); // удаление статьи при клике на кнопку 'удалить'
    // Далее удалим и из localStorage удаленную статью
    const articleIndex = articles.findIndex(
      (article) => article.id === +liItem.getAttribute("id")
    );
    articles.splice(articleIndex, 1);
    localStorage.setItem(lsKey, JSON.stringify(articles));
  } else if (target.closest(".edit-btn")) {
    const title = prompt("Введите название статьи");
    const text = prompt("Введите текст статьи");
    if (!text || !title) {
      alert("Не ввели данные");
      return;
    }
    const article = articles.find(
      (article) => article.id === +liItem.getAttribute("id")
    );
    article.title = title;
    article.text = text;

    localStorage.setItem(lsKey, JSON.stringify(articles));

    liItem.querySelector(".title").textContent = title;
    liItem.querySelector(".text").textContent = text;
  }
}); // сюда передадим event, но весь event не нужен, а достать только target и путь такая переменная будет (деструктуризация)

// Кнопка добавления статьи (по данному принципу работает метод добавления товара в корзину)
const addBtn = document.querySelector(".addnews-btn");
addBtn.addEventListener("click", () => {
  const title = prompt("Введите название статьи");
  const text = prompt("Введите текст статьи");

  if (text && title) {
    const newArticle = {
      id: Date.now(),
      title,
      text,
    };
    articles.push(newArticle);
    localStorage.setItem(lsKey, JSON.stringify(articles));
    ulList.insertAdjacentHTML("beforeend", createArticleHTML(newArticle));
  } else {
    alert("Вы неверно ввели данные статьи");
  }
});
