/*      JavaScript про API браузеров (семинары)
        Урок 2. События, формы
Вашей задачей является создание веб-слайдера для отображения изображений на веб-странице. Слайдер должен позволять переключаться между изображениями и отображать их в центре экрана.

1. Создайте интерфейс веб-страницы, который включает в себя следующие элементы:
    a. Контейнер для отображения текущего изображения.
    b. Кнопки "Предыдущее изображение" и "Следующее изображение" для переключения между изображениями.
    c. Навигационные точки (индикаторы) для быстрого переключения между изображениями.
2. Используйте HTML для создания элементов интерфейса.
3. Используйте JavaScript для обработки событий:
    a. При клике на кнопку "Предыдущее изображение" должно отображаться предыдущее изображение.
    b. При клике на кнопку "Следующее изображение" должно отображаться следующее изображение.
    c. При клике на навигационные точки, слайдер должен переключаться к соответствующему изображению.
4. Слайдер должен циклически переключаться между изображениями, то есть после последнего изображения должно отображаться первое, и наоборот.
5. Добавьте стилизацию для слайдера и элементов интерфейса с использованием CSS для улучшения внешнего вида.*/

let slideIndex = 1;
showSlide(slideIndex);

// Функция для показа следующего слайда
function nextSlide() {
  showSlide((slideIndex += 1));
}

// Функция для показа предыдущего слайда
function prevSlide() {
  showSlide((slideIndex -= 1));
}

function presentSlide(n) {
  showSlide((slideIndex = n));
}

function showSlide(n) {
  const slides = document.querySelectorAll(".slider-foto");
  let i;
  const points = document.querySelectorAll(".point");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < points.length; i++) {
    points[i].className = points[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  points[slideIndex - 1].className += " active";
}

const leftBtn = document.querySelector(".left_btn");
leftBtn.addEventListener("click", prevSlide);

const rightBtn = document.querySelector(".right_btn");
rightBtn.addEventListener("click", nextSlide);

const points = document.querySelectorAll(".point");
for (let i = 0; i < points.length; i++) {
  points[i].addEventListener("click", function (e) {
    presentSlide(i + 1);
  });
}
