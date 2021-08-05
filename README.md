Сборка на GULP v 2.0 от SRO.
Что нового?
1. Автоконвертация картинок в webp. Достаточно включить режим разработки и положить картинку в папку src/img.
2. Автосборка svg в sprite. Достаточно включить режим разработки и положить .svg в папку src/img/svg.
3. Добавлен babel 7.
4. Добавлен plumber.
5. Добавлены sourcemap для css и js.
6. Все css библиотеки теперь импортируются в scss нативно, добавлен фикс для импорта fancybox.css.
7. Для всех картиночных миксинов добавлены заглушки до включения lazyload, чтобы не ехала верстка.

Как юзать:
1. Устанавливаем пакеты: в консоли npm i
2. Все изменения вносятся только в папке src
3. npm run start - запуск сборки в режиме разработки
4. npm run build - запуск сборки в режиме продакшена (используем перед коммитом)

