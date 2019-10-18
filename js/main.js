'use strict';

var AUTHOR_NAMES = ['Хоакин Феникс', 'Роберт Де Ниро', 'Зази Битц', 'Фрэнсис Конрой', 'Бретт Каллен', 'Шей Уигэм', 'Билл Кэмп', 'Гленн Флешлер', 'Ли Гилл'];
var AUTHOR_COMMENTS = ['Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'В целом всё неплохо. Но не всё.', 'Всё отлично!'];
var AUTHOR_DESCRIPTIONS = ['Красивый бассейн', 'Было круто: 24.07.1960', 'Маленькое ухо', 'Привет с Колымы', 'Удачный отпуск на лесоповале'];
var LIKES_MIN = 15;
var LIKES_MAX = 200;
var pictureTemplate = document.querySelector('#picture')
.content
.querySelector('.picture');
var photos = [];

var getRandomInteger = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

var getRandomArray = function (arr) {
  var randomValue = Math.floor(Math.random() * arr.length);
  return randomValue;
};

var createPhoto = function (numberFirstPhoto) {
  var photo = {
    url: './photos/' + numberFirstPhoto + '.jpg',
    description: AUTHOR_DESCRIPTIONS[getRandomArray(AUTHOR_DESCRIPTIONS)],
    likes: getRandomInteger(LIKES_MIN, LIKES_MAX),
    comments: {
      avatar: './img/avatar-' + numberFirstPhoto + '.svg',
      message: AUTHOR_COMMENTS[getRandomArray(AUTHOR_COMMENTS)],
      name: AUTHOR_NAMES[getRandomArray(AUTHOR_NAMES)]
    }
  };
  return photo;
};

var createPhotosArray = function (countOfPhotos) {
  for (var i = 0; i < countOfPhotos; i++) {
    photos[i] = createPhoto(i + 1);
  }
  return photos;
};

var renderPhotos = function (photo) {
  var pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = photo.url;
  pictureElement.querySelector('.picture__likes').textContent = photo.likes;
  pictureElement.querySelector('.picture__comments').textContent = 1;

  return pictureElement;
};

var putPhotosToPage = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < photos.length; i++) {
    fragment.appendChild(renderPhotos(photos[i]));
  }
  document.querySelector('.pictures').appendChild(fragment);
};

createPhotosArray(25);
putPhotosToPage();
