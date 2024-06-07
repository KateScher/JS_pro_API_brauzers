console.log(navigator.userAgent); // информация о браузере
console.log(navigator.cookieEnabled); // включены ли cookie
console.log(navigator.doNotTrack); // включена ли опция запрета на отслеживание
console.log(navigator.geolocation); // геолокация, в данном случае не активированная

// Напишите функцию findClosestCity(userLocation, cities), которая принимает текущее местоположение пользователя в формате [latitude, longitude] и массив городов с их координатами в формате {name: 'City', location: [latitude, longitude]}. Функция должна вернуть название ближайшего города к пользователю.

function calculateDistance(location1, location2) {
  const [lat1, lon1] = location1; // разбивает координаты первого местоположения на широту и долготу
  const [lat2, lon2] = location2; // разбивает координаты второго местоположения на широту и долготу

  const toRad = (value) => (value * Math.PI) / 180; // преобразует значение в радианы
  const R = 6371; // радиус Земли в километрах

  const dLat = toRad(lat2 - lat1); // вычисляет разницу широты в радианах
  const dLon = toRad(lon2 - lon1); // Вычисляет разницу долготы в радианах
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) + // вычисляет квадрат синуса половины разницы широты
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2); // вычисляет квадрат синуса половины разницы долготы и учитывает косинусы широт
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); // вычисляет центральный угол между двумя местоположениями
  const distance = R * c; // вычисляет расстояние между двумя местоположениями на сфере Земли

  return distance; // возвращает расстояние между местоположениями
}

function findFastestCity(cities) {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      // проверяет поддержку геолокации в браузере
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = [
            position.coords.latitude,
            position.coords.longitude,
          ]; // получает текущие координаты пользователя
          let closestCity = null; // переменная для хранения ближайшего города
          let shortestDistance = Infinity; // переменная для хранения кратчайшего расстояния

          cities.forEach((city) => {
            //перебирает все города из массива cities
            const distance = calculateDistance(userLocation, city.location); // вычисляет расстояние между местоположением пользователя и текущим городом
            if (distance < shortestDistance) {
              // если расстояние меньше кратчайшего расстояния
              closestCity = city.name; // записывает имя текущего города в closestCity
              shortestDistance = distance; // записывает текущее расстояние в shortestDistance
            }
          });

          resolve(closestCity); // возвращает ближайший город
        },
        (error) => {
          if (error.code === error.PERMISSION_DENIED) {
            // Если пользователь отказал в доступе к геолокации
            reject(new Error("Пользователь отказал в доступе к геолокации.")); // возвращает ошибку
          } else {
            reject(new Error("Ошибка при получении местоположения.")); // возвращает ошибку
          }
        }
      );
    } else {
      reject(new Error("Геолокация не поддерживается вашим браузером.")); // возвращает ошибку
    }
  });
}

// Пример использования
const cities = [
  { name: "Нью-Йорк", location: [40.7128, -74.006] },
  { name: "Лондон", location: [51.5074, -0, 1278] },
  { name: "Токио", location: [35.6895, 139.6917] },
  { name: "Москва", location: [55.751244, 37.618423] },
  // ... и другие города
];

findFastestCity(cities)
  .then((closestCity) => {
    console.log(closestCity); // Ожидаемый результат: название ближайшего города
  })
  .catch((error) => {
    console.log(error.message);
  });
