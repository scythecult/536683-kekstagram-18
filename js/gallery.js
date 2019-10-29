'use strict';

(function () {

  var MIN_LIKES_COUNT = 15;
  var MAX_LIKES_COUNT = 200;
  var PHOTOS_COUNT = 25;

  var photoSample = document.querySelector('#picture').content.querySelector('.picture');
  var photosList = document.querySelector('.pictures');


  // генерирует объект-фотографию
  var generatePhoto = function (photoNumber) {
    var photo = {};

    var descriptionIndex = window.utils.generateRandomNumber(0, window.data.photoDescription.length - 1);

    photo.url = 'photos/' + photoNumber + '.jpg';
    photo.description = window.data.photoDescription[descriptionIndex];
    photo.likes = window.utils.generateRandomNumber(MIN_LIKES_COUNT, MAX_LIKES_COUNT);
    photo.comments = window.comments.generateComments();

    return photo;
  };

  // генерирует массив объектов-фотографий
  var generatePhotos = function (photosCount) {
    var photos = [];

    for (var i = 0; i < photosCount; i++) {
      photos[i] = generatePhoto(i + 1);
    }

    return photos;
  };

  // обработчик события click по миниатюре фото
  var onPhotoClick = function (photo) {
    window.renderBigPhoto(photo);
  };

  // обработчик события enter по миниатюре фото
  var onPhotoEnterPress = function (evt, photo) {
    window.utils.isEnterPress(evt, function () {
      window.renderBigPhoto(photo);
    });
  };

  // отрисовывает фотографию по шаблону
  var renderPhoto = function (photo) {
    var photoElement = photoSample.cloneNode(true);

    photoElement.addEventListener('click', function () {
      onPhotoClick(photo);
    });

    photoElement.addEventListener('keydown', function (evt) {
      onPhotoEnterPress(evt, photo);
    });

    photoElement.querySelector('img').src = photo.url;
    photoElement.querySelector('.picture__likes').textContent = photo.likes;
    photoElement.querySelector('.picture__comments').textContent = photo.comments.length;

    return photoElement;
  };

  // отрисовывает фотографии в блок .picture
  var renderPhotosList = function (photos) {
    var fragment = document.createDocumentFragment();

    photos.forEach(function (photo) {
      fragment.appendChild(renderPhoto(photo));
    });

    photosList.appendChild(fragment);
  };

  renderPhotosList(generatePhotos(PHOTOS_COUNT));

})();
