'use strict';

var PHOTO_NUMBER = 25;
var AVATAR_NUMBER = 6;
var MAX_COMMENTS = 100;
var VISIBLE_COMMENTS = 3;
var AUTHOR_COMMENTS = ['Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'В целом всё неплохо. Но не всё.', 'Всё отлично!'];
var AUTHOR_NAMES = ['Хоакин Феникс', 'Роберт Де Ниро', 'Зази Битц', 'Фрэнсис Конрой', 'Бретт Каллен', 'Шей Уигэм', 'Билл Кэмп', 'Гленн Флешлер', 'Ли Гилл'];
var AUTHOR_DESCRIPTIONS = ['Красивый бассейн', 'Было круто: 24.07.1960', 'Маленькое ухо', 'Привет с Колымы', 'Удачный отпуск на лесоповале'];
var getRandomElement = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

// comments
var generateComments = function (commentsNumber) {
  var comments = [];

  for (var i = 0; i < commentsNumber; i++) {
    comments.push({
      avatar: 'img/avatar-' + getRandomElement(1, AVATAR_NUMBER) + '.svg',
      message: AUTHOR_COMMENTS[getRandomElement(0, AUTHOR_COMMENTS.length)],
      name: AUTHOR_NAMES[getRandomElement(0, AUTHOR_NAMES.length)]
    });
  }
  return comments;
};

// description
var generatePhotoDescription = function () {
  var photos = [];
  for (var i = 0; i < PHOTO_NUMBER; i++) {
    photos.push({
      url: 'photos/' + (i + 1) + '.jpg',
      description:  AUTHOR_DESCRIPTIONS[getRandomElement(0, AUTHOR_DESCRIPTIONS.length)],
      likes: getRandomElement(15, 200),
      comments: generateComments(getRandomElement(0, MAX_COMMENTS))
    });
  }

  return photos;
};

// bigpicture
var showBigPicture = function (photo) {

  var bigPictureElement = document.querySelector('.big-picture');
  var commentsList = document.querySelector('.social__comments');
  var commentElement = commentsList.querySelector('.social__comment');
  bigPictureElement.classList.remove('hidden');

  bigPictureElement.querySelector('.big-picture__img img').src = photo.url;
  bigPictureElement.querySelector('.likes-count').textContent = photo.likes;
  bigPictureElement.querySelector('.comments-count').textContent = photo.comments.length;
  bigPictureElement.querySelector('.social__caption').textContent = photo.description;

  var fragment = document.createDocumentFragment();

  for (var i = 0; i < VISIBLE_COMMENTS; i++) {
    var comment = commentElement.cloneNode(true);

    comment.querySelector('.social__picture').src = photo.comments[i].avatar;
    comment.querySelector('.social__picture').alt = photo.comments[i].name;
    comment.querySelector('.social__text').textContent = photo.comments[i].message;

    fragment.appendChild(comment);
  }

  // deleting elements
  var children = commentsList.children;

  for (i = children.length - 1; i >= 0; i--) {
    commentsList.removeChild(children[i]);
  }

  commentsList.appendChild(fragment);

  bigPictureElement.querySelector('.social__comment-count').classList.add('visually-hidden');
  bigPictureElement.querySelector('.comments-loader').classList.add('visually-hidden');
};


var renderPhoto = function () {

  var pictureBlock = document.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');

  var photos = generatePhotoDescription();

  var fragment = document.createDocumentFragment();

  for (var i = 0; i < photos.length; i++) {
    var picture = pictureTemplate.cloneNode(true);

    picture.querySelector('.picture__img').src = photos[i].url;
    picture.querySelector('.picture__likes').textContent = photos[i].likes;
    picture.querySelector('.picture__comments').textContent = photos[i].comments.length;

    fragment.appendChild(picture);
  }

  showBigPicture(photos[0]);

  pictureBlock.appendChild(fragment);
};

renderPhoto();
