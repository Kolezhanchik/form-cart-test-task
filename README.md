## Тестовое задание на вакансию Front-end разработчика

###### ссылка на gh-pages 
https://Kolezhanchik.github.io/form-cart-test-task/

##### Инструкция по установке: 
```
git clone https://github.com/KoLenhen/form-cart-test-task.git

npm i webpack --save-dev

npm run build

npm run dev
```

#### CSS
* Использование Pre/Post процессоров (SCSS/SASS, Stylus, LESS, PostCSS)
* Использование соглашений/архитектур написания стилей MVCSS/Bem и т.п.
* Можно использовать ui-фреймворки (Bootstrap/Foundation/Semantic UI и т.п.), либо просто сетки.

##### Вариант 1
- Код должен быть структурирован, реализован в рамках парадигм MVC/MVVM/Functional programming. Можно использовать как реализацию классов, так и прототипно-ориентированное программирование. Можно использовать jQuery для работы с DOM, можно использовать Lodash/Underscore или др. Подобные библиотеки для работы с данными, массивами, объектами (однако приветствуется использование стандартных методов из ES6)
- Желательно использовать модули (Common.js/AMD и т.п.)
- Желательно использовать событийную модель общения между модулями
- Желательно иметь настроенный task-manager для сборки и запуска кода
- Желательно некоторые сущности разбить на отдельные сервисы (сервис обработки ошибок, сервис autocomplete, и т.п.) со специфичным интерфейсом
