/* Задание 2 (тайминг 30 минут)
Вы должны создать веб-страницу, которая позволяет пользователю динамически 
управлять элементами на странице. Ниже приведены основные требования и 
функциональность:
1. На странице должны быть кнопки "Добавить элемент", "Удалить элемент" и 
"Клонировать элемент".
2. При нажатии на кнопку "Добавить элемент" на страницу добавляется новый 
квадратный элемент (<div>) с размерами 100x100 пикселей. Этот элемент 
должен иметь класс .box и содержать текст, указывающий порядковый номер 
элемента (1, 2, 3 и так далее).
3. При нажатии на кнопку "Удалить элемент" удаляется последний добавленный 
элемент, если таковой имеется.
4. При нажатии на кнопку "Клонировать элемент" создается копия последнего 
добавленного элемента и добавляется на страницу.
5. Все элементы имеют класс .box и стилизованы с помощью CSS (см. пример).
6. Элементы могут быть добавлены, удалены и клонированы в любом порядке и в 
любом количестве.*/
// через делегирование (чтобы не делать 3 слушателя на 3 кнопки, т.е. делаем на ближайшего родителя слушатель, и делаем - если на 1 кнопку был клик - то одно действие, на другую - другое действие)
const wrapContainer = document.querySelector(".wrapper");
const container = wrapContainer.querySelector("#container");

wrapContainer.addEventListener("click", (event) => {
  if (event.target.closest("#addButton")) {
    const box = document.createElement("div");
    box.classList.add("box");
    box.textContent = container.children.length + 1;
    container.append(box);
  } else if (event.target.closest("#removeButton")) {
    // if (container.children.length > 0) { // либо ставим вопрос
    container.lastElementChild?.remove(); // если ставим вопрос - вместо if - т.е. если есть предыдущий элемент - то удалим. Если вопроса не будет, будет ошибка
    // container.removeChild(container.lastElementChild);
    // }
  } else if (event.target.closest("#cloneButton")) {
    if (container.children.length > 0) {
      const clone = container.lastElementChild.cloneNode(true);
      container.append(clone);
    }
  }
});
