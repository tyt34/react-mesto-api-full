# Проектная работа №13-14 (Яндекс.Практикум)

![](https://shields.io/badge/-HTML-orange) 
![](https://shields.io/badge/-CSS-blue)
![](https://shields.io/badge/-JavaScript-yellow)
![](https://shields.io/badge/-Node.js-3E863D)
![](https://shields.io/badge/-React.JS-05D9FF)
![](https://shields.io/badge/-MongoDB-00E661)
![](https://shields.io/badge/-Express.JS-384752)

## Функционал приложения 

* Полноценное приложение с backend и frontend.
* Регистрация и авторизация нового пользователя
* Изменение данных созданного пользователя
* Добавление и удаления карточек
* Добавление и удаления "лайка" на карточку
* В приложение присутствует валидация входных данных
* Локальные данные на стороне пользователя хранятся в *localStorage*.

## Планы по доработке
* Заменить хранение локальных данных с *localStorage* на *cookie*.
* Перейти на Redux. 
* Сделать автоматическую авторизацию после успешной регистрации. В текущей версии, после регистрации необходимо перейти на страницу входа и повторно ввести данные, указанные при регистрации.

## Запуск приложения
1. Скачайте репозиторий. 
2. Зайдите в папку `frontend`. Установите зависимости. Создайте файл **.env** с текстом
```
PORT=3001
REACT_APP_PUBLIC_URL=true
```
Если вы находитесь в папке `react-mesto-api-full-main`, то это можно сделать с помощью **команды**:

`cd frontend/ && echo -e "PORT=3001 \nREACT_APP_PUBLIC_URL=true" > .env && npm i && npm start`


3. Параллельно зайдите в папку `backend`. Установите зависимости. Запустите программу. Если вы находитесь в папке `react-mesto-api-full-main`, то это можно сделать с помощью **команды**:

`cd backend/ && npm i && npm start`
